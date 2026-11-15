[CmdletBinding()]
param(
    [string]$Root,
    [switch]$Check,
    [switch]$Staged,
    [ValidateSet('Claude', 'Agents')][string]$ResolveFrom
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
if (-not $Root) { $Root = Split-Path -Parent $PSScriptRoot }
$Root = [IO.Path]::GetFullPath($Root).TrimEnd([IO.Path]::DirectorySeparatorChar)
$script:Utf8 = New-Object Text.UTF8Encoding($false)
$script:Git = (Get-Command git -ErrorAction Stop).Source
$script:StartMarker = '<!-- agent-context:start -->'
$script:EndMarker = '<!-- agent-context:end -->'
$script:ContextPattern = '(?s)<!-- agent-context:start -->.*?<!-- agent-context:end -->'
$script:InfrastructureScripts = @('Sync-AgentGuidance.ps1', 'Watch-AgentGuidance.ps1', 'Setup-AgentGuidance.ps1', 'Test-AgentGuidance.ps1', 'Invoke-AgentGuidanceHook.ps1')

function Invoke-RepositoryGit {
    param([string[]]$Arguments)
    $quotedArguments = foreach ($argument in (@('-C', $Root) + $Arguments)) {
        $escapedArgument = [regex]::Replace($argument, '(\\*)"', '$1$1\"')
        $escapedArgument = [regex]::Replace($escapedArgument, '(\\+)$', '$1$1')
        '"' + $escapedArgument + '"'
    }
    $startInfo = New-Object Diagnostics.ProcessStartInfo
    $startInfo.FileName = $script:Git
    $startInfo.Arguments = $quotedArguments -join ' '
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true
    $startInfo.StandardOutputEncoding = $script:Utf8
    $process = New-Object Diagnostics.Process
    $process.StartInfo = $startInfo
    try {
        [void]$process.Start()
        $errorTask = $process.StandardError.ReadToEndAsync()
        $output = $process.StandardOutput.ReadToEnd()
        $process.WaitForExit()
        $errorOutput = $errorTask.Result
        if ($process.ExitCode -ne 0) { throw "Git failed ($($Arguments[0])): $errorOutput" }
        return $output
    }
    finally { $process.Dispose() }
}

function Get-SafePath {
    param([string]$RelativePath)
    if ([IO.Path]::IsPathRooted($RelativePath)) { throw "Expected a repository-relative path: $RelativePath" }
    $fullPath = [IO.Path]::GetFullPath((Join-Path $Root $RelativePath))
    $rootPrefix = $Root + [IO.Path]::DirectorySeparatorChar
    if (-not $fullPath.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Path escapes the repository: $RelativePath"
    }
    $candidate = $fullPath
    while ($candidate -ne $Root) {
        if (Test-Path -LiteralPath $candidate) {
            if ((Get-Item -Force -LiteralPath $candidate).Attributes -band [IO.FileAttributes]::ReparsePoint) {
                throw "Guidance automation does not follow links: $candidate"
            }
        }
        $candidate = Split-Path -Parent $candidate
    }
    return $fullPath
}

function Get-RepositoryFiles {
    $arguments = @('ls-files', '-z', '--cached')
    if (-not $Staged) { $arguments += @('--others', '--exclude-standard') }
    $paths = (Invoke-RepositoryGit $arguments).Split([char]0) | Where-Object { $_ } | Sort-Object -Unique
    foreach ($path in $paths) {
        if ($path -match '[\r\n]') { throw 'Filenames containing line breaks are not supported.' }
        if ($Staged -or (Test-Path -LiteralPath (Get-SafePath $path) -PathType Leaf)) { $path }
    }
}

function Read-RepositoryText {
    param([string]$Path)
    $text = if ($Staged) { Invoke-RepositoryGit @('show', ":$Path") } else {
        [IO.File]::ReadAllText((Get-SafePath $Path), $script:Utf8)
    }
    return $text.Replace("`r`n", "`n")
}

function Get-BytesHash {
    param([byte[]]$Bytes)
    $algorithm = [Security.Cryptography.SHA256]::Create()
    try { return ([BitConverter]::ToString($algorithm.ComputeHash($Bytes))).Replace('-', '').ToLowerInvariant() }
    finally { $algorithm.Dispose() }
}

function Get-RepositoryHash {
    param([string]$Path, [switch]$Guidance)
    if ($script:Files -notcontains $Path) { return $null }
    if ($Guidance) { return Get-BytesHash ($script:Utf8.GetBytes((Get-ManualGuidance (Read-RepositoryText $Path)))) }
    if ($Staged) { return (Invoke-RepositoryGit @('rev-parse', ":$Path")).Trim() }
    return Get-BytesHash ([IO.File]::ReadAllBytes((Get-SafePath $Path)))
}

function Get-ManualGuidance {
    param([string]$Text)
    $startCount = [regex]::Matches($Text, [regex]::Escape($script:StartMarker)).Count
    $endCount = [regex]::Matches($Text, [regex]::Escape($script:EndMarker)).Count
    if ($startCount -ne $endCount -or $startCount -gt 1 -or ($startCount -eq 1 -and $Text.IndexOf($script:StartMarker) -gt $Text.IndexOf($script:EndMarker))) {
        throw 'Malformed generated-context markers in root guidance. Restore one matching start/end pair.'
    }
    return ([regex]::Replace($Text, $script:ContextPattern, '')).TrimEnd() + "`n"
}

function Get-ProjectContext {
    [string[]]$sourceFiles = @($script:Files | Where-Object {
        $_ -notmatch '(^|/)(\.git|\.claude|\.agents|\.agent-guidance|node_modules|\.next|dist|build|coverage|vendor|\.venv|playwright-report|test-results)(/|$)' -and
        $_ -notmatch '(^|/)\.env($|\.)' -and $_ -notmatch '(^|/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb?)$' -and
        $_ -match '\.(html?|css|scss|sass|less|[cm]?jsx?|tsx?|json|toml|ya?ml|py|vue|svelte|astro|ps1)$' -and
        -not ($_.StartsWith('scripts/') -and $script:InfrastructureScripts -contains (Split-Path -Leaf $_)) -and
        $_ -notmatch '^\.github/'
    })
    # Culture sorting differs between Windows PowerShell (NLS) and PowerShell 7 (ICU).
    [Array]::Sort($sourceFiles, [StringComparer]::Ordinal)
    $fingerprintEntries = foreach ($path in $sourceFiles) {
        $hash = Get-BytesHash ($script:Utf8.GetBytes((Read-RepositoryText $path)))
        "$path|$hash"
    }
    $fingerprint = Get-BytesHash ($script:Utf8.GetBytes(($fingerprintEntries -join "`n")))
    $lines = New-Object 'Collections.Generic.List[string]'
    $lines.Add('# Generated project context')
    $lines.Add('')
    $lines.Add('Generated from the current repository by `scripts/Sync-AgentGuidance.ps1`. Do not edit this section or either project-context.md file by hand.')
    $lines.Add('')
    $lines.Add('## Application')
    $lines.Add('')
    if ($script:Files -contains 'package.json') {
        $manifest = Read-RepositoryText 'package.json' | ConvertFrom-Json -ErrorAction Stop
        $manifestName = $manifest.PSObject.Properties['name']
        if ($null -ne $manifestName) { $lines.Add('Package: `' + ([string]$manifestName.Value).Replace('`', '') + '`.') }
        $frameworkNames = @('next', 'astro', 'vite', 'react', 'vue', 'svelte', '@sveltejs/kit', 'nuxt', 'gatsby', 'eleventy', '@11ty/eleventy')
        $dependencies = @()
        foreach ($sectionName in @('dependencies', 'devDependencies')) {
            $section = $manifest.PSObject.Properties[$sectionName]
            if ($null -ne $section -and $null -ne $section.Value) { $dependencies += $section.Value.PSObject.Properties.Name }
        }
        $detected = @($frameworkNames | Where-Object { $dependencies -contains $_ })
        if ($detected.Count) { $lines.Add('Detected framework/tool dependencies: ' + ($detected -join ', ') + '.') }
        else { $lines.Add('No recognized website framework dependency detected; inspect package.json before choosing commands.') }
        $lines.Add('')
        $lines.Add('### Package scripts')
        $lines.Add('')
        $scriptProperty = $manifest.PSObject.Properties['scripts']
        if ($null -ne $scriptProperty -and $null -ne $scriptProperty.Value -and @($scriptProperty.Value.PSObject.Properties).Count) {
            foreach ($property in ($scriptProperty.Value.PSObject.Properties | Sort-Object Name)) {
                $safeName = $property.Name.Replace('`', '').Replace("`n", ' ')
                $safeCommand = ([string]$property.Value).Replace('`', '').Replace("`n", ' ').Replace("`r", '')
                $lines.Add('- `' + $safeName + '`: `' + $safeCommand + '`')
            }
        }
        else { $lines.Add('No package scripts declared.') }
    }
    elseif (@($sourceFiles | Where-Object { $_ -match '\.html?$' }).Count) {
        $lines.Add('HTML files are present; no package.json is present. Inspect the site before choosing a server.')
    }
    else { $lines.Add('No package.json or HTML entry point is present yet. The portfolio application has not been added.') }
    $lockfiles = @('package-lock.json', 'npm-shrinkwrap.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lock', 'bun.lockb') | Where-Object { $script:Files -contains $_ }
    $lines.Add('')
    if (@($lockfiles).Count) { $lines.Add('Lockfiles: ' + ($lockfiles -join ', ') + '. Use the matching package manager; investigate mixed lockfiles.') }
    else { $lines.Add('No JavaScript package-manager lockfile is present.') }
    $lines.Add('')
    $lines.Add('## Code and configuration inventory')
    $lines.Add('')
    $lines.Add('Content fingerprint (SHA-256, text line endings normalized): `' + $fingerprint + '`.')
    $lines.Add('')
    if ($sourceFiles.Count) {
        foreach ($path in ($sourceFiles | Select-Object -First 80)) { $lines.Add('- `' + $path.Replace('`', '') + '`') }
        if ($sourceFiles.Count -gt 80) { $lines.Add('- Additional files: ' + ($sourceFiles.Count - 80) + ' (included in fingerprint).') }
    }
    else { $lines.Add('No application source/configuration files detected yet.') }
    $lines.Add('')
    $lines.Add('Git-ignored files, environment files, generated output, dependency trees, and guidance infrastructure are excluded. This inventory does not execute package scripts or infer design decisions. Update manual guidance when code changes alter how the project should be developed or verified.')
    return ($lines -join "`n") + "`n"
}

function Get-RenderedGuidance {
    param([string]$Manual, [string]$Context)
    return $Manual.TrimEnd() + "`n`n" + $script:StartMarker + "`n" + $Context + $script:EndMarker + "`n"
}

function Write-AtomicBytes {
    param([string]$Path, [byte[]]$Bytes)
    $destination = Get-SafePath $Path
    if ((Test-Path -LiteralPath $destination -PathType Leaf) -and (Get-BytesHash ([IO.File]::ReadAllBytes($destination))) -eq (Get-BytesHash $Bytes)) { return $false }
    $directory = Split-Path -Parent $destination
    [void][IO.Directory]::CreateDirectory($directory)
    $temporaryPath = Join-Path $directory ('.agent-write-' + [Guid]::NewGuid().ToString('N') + '.tmp')
    try {
        [IO.File]::WriteAllBytes($temporaryPath, $Bytes)
        if (Test-Path -LiteralPath $destination) { [IO.File]::Replace($temporaryPath, $destination, [System.Management.Automation.Language.NullString]::Value) }
        else { [IO.File]::Move($temporaryPath, $destination) }
    }
    finally { if (Test-Path -LiteralPath $temporaryPath) { Remove-Item -LiteralPath $temporaryPath -Force } }
    return $true
}

function Get-Pairs {
    param([hashtable]$Baseline)
    [pscustomobject]@{ Key = 'guidance'; Left = 'CLAUDE.md'; Right = 'AGENTS.md'; Guidance = $true }
    $skillPaths = @($script:Files | Where-Object { $_ -match '^\.(claude|agents)/skills/' } | ForEach-Object { $_ -replace '^\.(claude|agents)/skills/', '' })
    $skillPaths += @($Baseline.Keys | Where-Object { $_.StartsWith('skill/') } | ForEach-Object { $_.Substring(6) })
    foreach ($path in ($skillPaths | Sort-Object -Unique)) {
        [pscustomobject]@{ Key = "skill/$path"; Left = ".claude/skills/$path"; Right = ".agents/skills/$path"; Guidance = $false }
    }
}

if ($Staged -and -not $Check) { throw '-Staged is read-only and requires -Check.' }
if ($ResolveFrom -and $Check) { throw '-ResolveFrom cannot be combined with -Check.' }
$actualRoot = [IO.Path]::GetFullPath((Invoke-RepositoryGit @('rev-parse', '--show-toplevel')).Trim()).TrimEnd([IO.Path]::DirectorySeparatorChar)
if ($actualRoot -ne $Root) { throw '-Root must name the root of its own Git checkout.' }
$localDirectory = Get-SafePath '.agent-guidance'
[void][IO.Directory]::CreateDirectory($localDirectory)
$lockPath = Get-SafePath '.agent-guidance/sync.lock'
$lockStream = $null
$deadline = [DateTime]::UtcNow.AddSeconds(10)
while ($null -eq $lockStream) {
    try { $lockStream = [IO.File]::Open($lockPath, 'OpenOrCreate', 'ReadWrite', 'None') }
    catch [IO.IOException] {
        if ([DateTime]::UtcNow -ge $deadline) { throw 'Another guidance sync is still running; retry after it finishes.' }
        Start-Sleep -Milliseconds 100
    }
}
try {
    $script:Files = @(Get-RepositoryFiles)
    $context = Get-ProjectContext
    if ($Check) {
        $problems = New-Object 'Collections.Generic.List[string]'
        foreach ($pair in (Get-Pairs @{})) {
            $leftHash = Get-RepositoryHash $pair.Left -Guidance:$pair.Guidance
            $rightHash = Get-RepositoryHash $pair.Right -Guidance:$pair.Guidance
            if ($leftHash -ne $rightHash -or ($pair.Guidance -and $null -eq $leftHash)) { $problems.Add("Peers differ or are missing: $($pair.Left), $($pair.Right)") }
        }
        foreach ($path in @('CLAUDE.md', 'AGENTS.md', '.claude/project-context.md', '.agents/project-context.md')) {
            if ($script:Files -notcontains $path) { $problems.Add("Missing: $path"); continue }
            $actual = Read-RepositoryText $path
            $expected = if ($path -in @('CLAUDE.md', 'AGENTS.md')) { Get-RenderedGuidance (Get-ManualGuidance $actual) $context } else { $context }
            if ($actual -cne $expected) { $problems.Add("Generated context is stale: $path") }
        }
        if ($problems.Count) {
            $scope = if ($Staged) { 'Git index' } else { 'working tree' }
            throw "Guidance check failed ($scope):`n$($problems -join "`n")`nRun scripts/Sync-AgentGuidance.ps1, review, and stage the matching files explicitly."
        }
        Write-Output ('Agent guidance is synchronized (' + $(if ($Staged) { 'Git index' } else { 'working tree' }) + ').')
        return
    }

    $baseline = @{}
    $statePath = Get-SafePath '.agent-guidance/state.json'
    if (Test-Path -LiteralPath $statePath) {
        $state = [IO.File]::ReadAllText($statePath, $script:Utf8) | ConvertFrom-Json -ErrorAction Stop
        if ($state.version -ne 1) { throw 'Unsupported synchronization state version. Review local state before resetting it.' }
        foreach ($property in $state.pairs.PSObject.Properties) { $baseline[$property.Name] = $property.Value }
    }
    $conflicts = New-Object 'Collections.Generic.List[string]'
    $writes = @{}
    $deletions = New-Object 'Collections.Generic.List[string]'
    $nextBaseline = [ordered]@{}
    $manualGuidance = $null
    foreach ($pair in (Get-Pairs $baseline)) {
        $leftHash = Get-RepositoryHash $pair.Left -Guidance:$pair.Guidance
        $rightHash = Get-RepositoryHash $pair.Right -Guidance:$pair.Guidance
        $oldHash = $baseline[$pair.Key]
        $source = $null
        $target = $null
        if ($pair.Guidance -and $null -eq $leftHash -and $null -eq $rightHash) { throw 'Both root guidance files are missing. Restore one before synchronizing.' }
        if ($leftHash -eq $rightHash) { $source = $pair.Left }
        elseif ($pair.Guidance -and ($null -eq $leftHash -or $null -eq $rightHash)) {
            $source = if ($null -eq $leftHash) { $pair.Right } else { $pair.Left }
        }
        elseif ($ResolveFrom) {
            $source = if ($ResolveFrom -eq 'Claude') { $pair.Left } else { $pair.Right }
            $target = if ($ResolveFrom -eq 'Claude') { $pair.Right } else { $pair.Left }
        }
        elseif ($null -eq $oldHash -and ($null -eq $leftHash -or $null -eq $rightHash)) {
            $source = if ($null -eq $leftHash) { $pair.Right } else { $pair.Left }
            $target = if ($null -eq $leftHash) { $pair.Left } else { $pair.Right }
        }
        elseif ($null -ne $oldHash -and $leftHash -eq $oldHash) { $source = $pair.Right; $target = $pair.Left }
        elseif ($null -ne $oldHash -and $rightHash -eq $oldHash) { $source = $pair.Left; $target = $pair.Right }
        else { $conflicts.Add("$($pair.Left) <-> $($pair.Right)"); continue }

        if ($pair.Guidance) {
            $manualGuidance = Get-ManualGuidance (Read-RepositoryText $source)
            $nextBaseline[$pair.Key] = Get-BytesHash ($script:Utf8.GetBytes($manualGuidance))
        }
        else {
            $sourceHash = if ($source -eq $pair.Left) { $leftHash } else { $rightHash }
            if ($null -ne $sourceHash) { $nextBaseline[$pair.Key] = $sourceHash }
            if ($target) {
                if ($null -eq $sourceHash) { $deletions.Add($target) }
                else { $writes[$target] = [IO.File]::ReadAllBytes((Get-SafePath $source)) }
            }
        }
    }
    if ($conflicts.Count) {
        throw "Conflicting edits; nothing was synchronized:`n$($conflicts -join "`n")`nReview both versions. Make them agree or explicitly use -ResolveFrom Claude / -ResolveFrom Agents."
    }
    foreach ($path in @('CLAUDE.md', 'AGENTS.md')) { $writes[$path] = $script:Utf8.GetBytes((Get-RenderedGuidance $manualGuidance $context)) }
    foreach ($path in @('.claude/project-context.md', '.agents/project-context.md')) { $writes[$path] = $script:Utf8.GetBytes($context) }
    foreach ($path in (@($writes.Keys) + @($deletions))) { [void](Get-SafePath $path) }
    $changed = 0
    foreach ($path in ($writes.Keys | Sort-Object)) { if (Write-AtomicBytes $path $writes[$path]) { $changed++ } }
    foreach ($path in $deletions) {
        $fullPath = Get-SafePath $path
        if (Test-Path -LiteralPath $fullPath -PathType Leaf) { Remove-Item -LiteralPath $fullPath -Force; $changed++ }
    }
    $stateJson = [ordered]@{ version = 1; pairs = $nextBaseline } | ConvertTo-Json -Depth 5
    [void](Write-AtomicBytes '.agent-guidance/state.json' ($script:Utf8.GetBytes($stateJson + "`n")))
    if ($changed) { Write-Output "Synchronized $changed guidance file(s)." }
}
finally { $lockStream.Dispose() }
