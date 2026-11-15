[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$syncScript = Join-Path $PSScriptRoot 'Sync-AgentGuidance.ps1'
$watchScript = Join-Path $PSScriptRoot 'Watch-AgentGuidance.ps1'
$temporaryBase = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
$fixtureRoot = Join-Path $temporaryBase ('guidance-tests-' + [Guid]::NewGuid().ToString('N') + ' space')
$utf8 = New-Object Text.UTF8Encoding($false)
$script:Passed = 0
$watchProcess = $null

function Assert-True {
    param([bool]$Condition, [string]$Message)
    if (-not $Condition) { throw "Assertion failed: $Message" }
}

function Write-Fixture {
    param([string]$Path, [string]$Text)
    $destination = Join-Path $fixtureRoot $Path
    [void][IO.Directory]::CreateDirectory((Split-Path -Parent $destination))
    [IO.File]::WriteAllText($destination, $Text, $utf8)
}

function Read-Fixture {
    param([string]$Path)
    return [IO.File]::ReadAllText((Join-Path $fixtureRoot $Path), $utf8)
}

function Invoke-FixtureGit {
    param([string[]]$Arguments)
    # Windows PowerShell treats any native stderr as ErrorRecord, even successful Git hook output.
    $previousPreference = $ErrorActionPreference
    try {
        $ErrorActionPreference = 'Continue'
        $output = & git -C $fixtureRoot @Arguments 2>&1
        $exitCode = $LASTEXITCODE
    }
    finally { $ErrorActionPreference = $previousPreference }
    if ($exitCode -ne 0) { throw "Fixture Git failed: $output" }
    return $output
}

function Assert-Fails {
    param([scriptblock]$Action, [string]$ExpectedMessage)
    $failure = $null
    try { & $Action | Out-Null }
    catch { $failure = $_.Exception.Message }
    Assert-True ($null -ne $failure) 'the operation must reject this input'
    Assert-True ($failure -match $ExpectedMessage) "expected failure '$ExpectedMessage', got '$failure'"
}

function Run-Case {
    param([string]$Name, [scriptblock]$Action)
    & $Action
    $script:Passed++
    Write-Output "PASS $Name"
}

function Wait-Condition {
    param([scriptblock]$Condition, [string]$Message)
    $deadline = [DateTime]::UtcNow.AddSeconds(12)
    do {
        if (& $Condition) { return }
        Start-Sleep -Milliseconds 150
    } while ([DateTime]::UtcNow -lt $deadline)
    throw "Timed out: $Message"
}

try {
    [void][IO.Directory]::CreateDirectory($fixtureRoot)
    Invoke-FixtureGit @('init', '--quiet') | Out-Null
    Invoke-FixtureGit @('config', 'core.autocrlf', 'false') | Out-Null
    Write-Fixture '.gitignore' ".agent-guidance/`n.env*`nnode_modules/`n"
    Write-Fixture 'CLAUDE.md' "# Fixture`n`nManual instructions.`n"
    Write-Fixture '.claude/skills/example/SKILL.md' "---`nname: example`ndescription: Fixture skill.`n---`n`nOriginal skill.`n"

    Run-Case 'bootstrap creates root, skill, and context peers without a framework assumption' {
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ((Read-Fixture 'CLAUDE.md') -ceq (Read-Fixture 'AGENTS.md')) 'root peers match'
        Assert-True ((Read-Fixture '.claude/skills/example/SKILL.md') -ceq (Read-Fixture '.agents/skills/example/SKILL.md')) 'skill peers match'
        Assert-True ((Read-Fixture '.claude/project-context.md') -match 'has not been added') 'empty repo context is factual'
        & $syncScript -Root $fixtureRoot -Check | Out-Null
    }

    Run-Case 'Windows PowerShell and PowerShell 7 agree on punctuation in source filenames' {
        $legacyEngine = Get-Command powershell.exe -ErrorAction SilentlyContinue
        $modernEngine = Get-Command pwsh.exe -ErrorAction SilentlyContinue
        if (-not $legacyEngine -or -not $modernEngine) {
            Write-Output 'SKIP cross-engine check: both Windows engines are required.'
            return
        }
        Write-Fixture 'src/order-item.ts' "export const first = 1;`n"
        Write-Fixture 'src/order.item.ts' "export const second = 2;`n"
        & $legacyEngine.Source -NoProfile -ExecutionPolicy Bypass -File $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ($LASTEXITCODE -eq 0) 'legacy engine generates context'
        $previousPreference = $ErrorActionPreference
        try {
            $ErrorActionPreference = 'Continue'
            $crossEngineOutput = & $modernEngine.Source -NoProfile -ExecutionPolicy Bypass -File $syncScript -Root $fixtureRoot -Check 2>&1
            $crossEngineExitCode = $LASTEXITCODE
        }
        finally { $ErrorActionPreference = $previousPreference }
        if ($crossEngineExitCode -ne 0) {
            $legacyContext = Read-Fixture '.claude/project-context.md'
            & $modernEngine.Source -NoProfile -ExecutionPolicy Bypass -File $syncScript -Root $fixtureRoot | Out-Null
            $modernContext = Read-Fixture '.claude/project-context.md'
            $contextDifference = Compare-Object ($legacyContext.Split("`n")) ($modernContext.Split("`n")) | Out-String
            throw "Assertion failed: modern engine accepts legacy context. Differences: $contextDifference"
        }
    }

    Run-Case 'root edits propagate from Agents and from Claude' {
        Write-Fixture 'AGENTS.md' ((Read-Fixture 'AGENTS.md').Replace('Manual instructions.', 'Agents edit.'))
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ((Read-Fixture 'CLAUDE.md') -match 'Agents edit\.') 'Agents edits reach Claude'
        Write-Fixture 'CLAUDE.md' ((Read-Fixture 'CLAUDE.md').Replace('Agents edit.', 'Claude edit.'))
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ((Read-Fixture 'AGENTS.md') -match 'Claude edit\.') 'Claude edits reach Agents'
    }

    Run-Case 'supporting files mirror both directions including binary data' {
        Write-Fixture '.agents/skills/example/reference.md' "Reference from Agents.`n"
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ((Read-Fixture '.claude/skills/example/reference.md') -eq "Reference from Agents.`n") 'Agents additions reach Claude'
        $binaryPath = Join-Path $fixtureRoot '.claude/skills/example/asset.bin'
        [IO.File]::WriteAllBytes($binaryPath, [byte[]]@(0, 128, 255, 1))
        & $syncScript -Root $fixtureRoot | Out-Null
        $copied = [IO.File]::ReadAllBytes((Join-Path $fixtureRoot '.agents/skills/example/asset.bin'))
        Assert-True (([BitConverter]::ToString($copied)) -eq '00-80-FF-01') 'binary bytes survive'
    }

    Run-Case 'skill renames and deletions propagate' {
        Move-Item -LiteralPath (Join-Path $fixtureRoot '.agents/skills/example/reference.md') -Destination (Join-Path $fixtureRoot '.agents/skills/example/renamed.md')
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True (-not (Test-Path -LiteralPath (Join-Path $fixtureRoot '.claude/skills/example/reference.md'))) 'old name removed'
        Assert-True (Test-Path -LiteralPath (Join-Path $fixtureRoot '.claude/skills/example/renamed.md')) 'new name copied'
        Remove-Item -LiteralPath (Join-Path $fixtureRoot '.claude/skills/example/renamed.md')
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True (-not (Test-Path -LiteralPath (Join-Path $fixtureRoot '.agents/skills/example/renamed.md'))) 'deletion reaches peer'
    }

    Run-Case 'a root guide is restored rather than deleting both guides' {
        Remove-Item -LiteralPath (Join-Path $fixtureRoot 'AGENTS.md')
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ((Read-Fixture 'CLAUDE.md') -ceq (Read-Fixture 'AGENTS.md')) 'surviving guide restored'
    }

    Run-Case 'conflicting edits preserve both sides, other pending work, and baseline state' {
        $stateBefore = Read-Fixture '.agent-guidance/state.json'
        Write-Fixture 'CLAUDE.md' "# Left conflict`n"
        Write-Fixture 'AGENTS.md' "# Right conflict`n"
        Write-Fixture '.agents/skills/example/pending.md' "Must wait for conflict resolution.`n"
        Assert-Fails { & $syncScript -Root $fixtureRoot } 'Conflicting edits'
        Assert-True ((Read-Fixture 'CLAUDE.md') -eq "# Left conflict`n") 'left untouched'
        Assert-True ((Read-Fixture 'AGENTS.md') -eq "# Right conflict`n") 'right untouched'
        Assert-True ((Read-Fixture '.agent-guidance/state.json') -ceq $stateBefore) 'baseline untouched'
        Assert-True (-not (Test-Path -LiteralPath (Join-Path $fixtureRoot '.claude/skills/example/pending.md'))) 'unrelated planned copies do not run'
        & $syncScript -Root $fixtureRoot -ResolveFrom Agents | Out-Null
        Assert-True ((Read-Fixture 'CLAUDE.md') -match 'Right conflict') 'reviewed resolution selected'
    }

    Run-Case 'edit-versus-delete conflicts do not lose skill contents' {
        Write-Fixture '.claude/skills/example/pending.md' "Changed on Claude.`n"
        Remove-Item -LiteralPath (Join-Path $fixtureRoot '.agents/skills/example/pending.md')
        Assert-Fails { & $syncScript -Root $fixtureRoot } 'Conflicting edits'
        Assert-True ((Read-Fixture '.claude/skills/example/pending.md') -eq "Changed on Claude.`n") 'edited contents preserved'
        & $syncScript -Root $fixtureRoot -ResolveFrom Claude | Out-Null
    }

    Run-Case 'actual package scripts, framework dependencies, and content edits refresh all context' {
        Write-Fixture 'package.json' '{"name":"fixture-portfolio","scripts":{"dev":"vite --host 127.0.0.1","test":"node --test"},"devDependencies":{"vite":"1.0.0"}}'
        Write-Fixture 'src/site.js' "export const title = 'First';`n"
        Write-Fixture 'package-lock.json' '{}'
        & $syncScript -Root $fixtureRoot | Out-Null
        $before = Read-Fixture '.claude/project-context.md'
        Assert-True ($before -match 'vite --host 127\.0\.0\.1' -and $before -match 'package-lock\.json') 'actual commands and lockfile described'
        Write-Fixture 'src/site.js' "export const title = 'Second';`n"
        Assert-Fails { & $syncScript -Root $fixtureRoot -Check } 'stale'
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ((Read-Fixture '.claude/project-context.md') -cne $before) 'editing code contents changes context'
        Assert-True ((Read-Fixture 'AGENTS.md') -match 'fixture-portfolio') 'root context refreshed'
        Assert-True ((Read-Fixture '.agents/project-context.md') -ceq (Read-Fixture '.claude/project-context.md')) 'folder context peers match'
    }

    Run-Case 'ignored files and tool-specific settings stay outside shared synchronization' {
        $contextBefore = Read-Fixture '.claude/project-context.md'
        Write-Fixture '.env.local' 'PRIVATE_TOKEN=not-a-real-secret'
        Write-Fixture 'node_modules/ignored.js' 'Ignored dependency'
        Write-Fixture '.claude/settings.json' '{"toolSpecific":true}'
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ((Read-Fixture '.claude/project-context.md') -ceq $contextBefore) 'excluded files do not affect context'
        Assert-True (-not (Test-Path -LiteralPath (Join-Path $fixtureRoot '.agents/settings.json'))) 'settings not copied to another tool'
    }

    Run-Case 'generated context is rebuilt and repeated synchronization is idempotent' {
        Write-Fixture '.agents/project-context.md' "Hand-edited generated data.`n"
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ((Read-Fixture '.agents/project-context.md') -ceq (Read-Fixture '.claude/project-context.md')) 'generated data repaired'
        $guidePath = Join-Path $fixtureRoot 'CLAUDE.md'
        $writeTime = [IO.File]::GetLastWriteTimeUtc($guidePath)
        & $syncScript -Root $fixtureRoot | Out-Null
        Assert-True ([IO.File]::GetLastWriteTimeUtc($guidePath) -eq $writeTime) 'unchanged files not rewritten'
    }

    Run-Case 'malformed package JSON and guidance markers fail before writing peers' {
        $manifest = Read-Fixture 'package.json'
        $guideBefore = Read-Fixture 'CLAUDE.md'
        Write-Fixture 'package.json' '{broken'
        Assert-Fails { & $syncScript -Root $fixtureRoot } 'JSON|Invalid|primitive'
        Assert-True ((Read-Fixture 'CLAUDE.md') -ceq $guideBefore) 'parse errors leave shared files unchanged'
        Write-Fixture 'package.json' $manifest
        Write-Fixture 'CLAUDE.md' "# Broken`n<!-- agent-context:start -->`n"
        Assert-Fails { & $syncScript -Root $fixtureRoot } 'Malformed generated-context'
        Write-Fixture 'CLAUDE.md' $guideBefore
    }

    Run-Case 'index checks reject stale staged context without staging unstaged changes' {
        Invoke-FixtureGit @('add', '--all') | Out-Null
        & $syncScript -Root $fixtureRoot -Check -Staged | Out-Null
        Write-Fixture 'src/site.js' "export const title = 'Staged change';`n"
        Invoke-FixtureGit @('add', '--', 'src/site.js') | Out-Null
        & $syncScript -Root $fixtureRoot | Out-Null
        $indexBefore = Invoke-FixtureGit @('write-tree')
        Assert-Fails { & $syncScript -Root $fixtureRoot -Check -Staged } 'Git index'
        Assert-True ((Invoke-FixtureGit @('write-tree')) -eq $indexBefore) 'index unchanged by check'
        Invoke-FixtureGit @('add', '--', 'CLAUDE.md', 'AGENTS.md', '.claude/project-context.md', '.agents/project-context.md') | Out-Null
        & $syncScript -Root $fixtureRoot -Check -Staged | Out-Null
        Write-Fixture 'src/site.js' "export const title = 'Unstaged later change';`n"
        & $syncScript -Root $fixtureRoot | Out-Null
        & $syncScript -Root $fixtureRoot -Check -Staged | Out-Null
        Invoke-FixtureGit @('add', '--', 'CLAUDE.md', 'AGENTS.md') | Out-Null
        Assert-Fails { & $syncScript -Root $fixtureRoot -Check -Staged } 'Git index'
        Invoke-FixtureGit @('add', '--all') | Out-Null
    }

    Run-Case 'Git executes the real pre-commit launcher and rejects drift' {
        $scriptDirectory = Join-Path $fixtureRoot 'scripts'
        [void][IO.Directory]::CreateDirectory($scriptDirectory)
        foreach ($name in @('Sync-AgentGuidance.ps1', 'Watch-AgentGuidance.ps1', 'Setup-AgentGuidance.ps1', 'Invoke-AgentGuidanceHook.ps1')) {
            Copy-Item -LiteralPath (Join-Path $PSScriptRoot $name) -Destination (Join-Path $scriptDirectory $name)
        }
        $hookDirectory = Join-Path $fixtureRoot '.githooks'
        [void][IO.Directory]::CreateDirectory($hookDirectory)
        foreach ($hook in @('pre-commit', 'post-checkout', 'post-merge')) {
            Copy-Item -LiteralPath (Join-Path (Split-Path -Parent $PSScriptRoot) ".githooks/$hook") -Destination (Join-Path $hookDirectory $hook)
        }
        & (Join-Path $scriptDirectory 'Setup-AgentGuidance.ps1') -Root $fixtureRoot -NoWatch | Out-Null
        Invoke-FixtureGit @('add', '--all') | Out-Null
        Invoke-FixtureGit @('hook', 'run', 'pre-commit') | Out-Null
        Write-Fixture '.agents/skills/example/SKILL.md' "Changed without synchronization.`n"
        Assert-Fails { Invoke-FixtureGit @('hook', 'run', 'pre-commit') } 'check failed|Peers differ'
        & $syncScript -Root $fixtureRoot | Out-Null
        Invoke-FixtureGit @('add', '--all') | Out-Null
    }

    Run-Case 'a separate background watcher propagates editor and code changes and reports conflicts' {
        $enginePath = (Get-Process -Id $PID).Path
        $arguments = '-NoProfile -NonInteractive -ExecutionPolicy Bypass -File "' + $watchScript + '" -Root "' + $fixtureRoot + '" -IntervalMilliseconds 300 -Iterations 200'
        $startArguments = @{ FilePath = $enginePath; ArgumentList = $arguments; PassThru = $true }
        if ([Environment]::OSVersion.Platform -eq [PlatformID]::Win32NT) { $startArguments.WindowStyle = 'Hidden' }
        $script:watchProcess = Start-Process @startArguments
        Wait-Condition { Test-Path -LiteralPath (Join-Path $fixtureRoot '.agent-guidance/watcher-status.json') } 'watcher startup'
        Write-Fixture '.agents/skills/example/live.md' "Live edit.`n"
        Wait-Condition { Test-Path -LiteralPath (Join-Path $fixtureRoot '.claude/skills/example/live.md') } 'live skill propagation'
        $contextBefore = Read-Fixture '.claude/project-context.md'
        Write-Fixture 'src/site.js' "export const title = 'Live code change';`n"
        Wait-Condition { (Read-Fixture '.claude/project-context.md') -cne $contextBefore } 'live code context refresh'
        # Hold the synchronizer's lock so this scenario never depends on editor timing.
        $editLock = $null
        $editDeadline = [DateTime]::UtcNow.AddSeconds(12)
        while ($null -eq $editLock) {
            try { $editLock = [IO.File]::Open((Join-Path $fixtureRoot '.agent-guidance/sync.lock'), 'OpenOrCreate', 'ReadWrite', 'None') }
            catch [IO.IOException] {
                if ([DateTime]::UtcNow -ge $editDeadline) { throw 'Timed out acquiring the fixture synchronizer lock.' }
                Start-Sleep -Milliseconds 50
            }
        }
        try {
            Write-Fixture '.claude/skills/example/live.md' "Left live conflict.`n"
            Write-Fixture '.agents/skills/example/live.md' "Right live conflict.`n"
        }
        finally { $editLock.Dispose() }
        Wait-Condition { Test-Path -LiteralPath (Join-Path $fixtureRoot '.agent-guidance/watcher-error.log') } 'watcher conflict status'
        Assert-True ((Read-Fixture '.claude/skills/example/live.md') -eq "Left live conflict.`n") 'watcher preserves left conflict'
        Assert-True ((Read-Fixture '.agents/skills/example/live.md') -eq "Right live conflict.`n") 'watcher preserves right conflict'
        Write-Fixture '.agents/skills/example/live.md' "Left live conflict.`n"
        Wait-Condition { -not (Test-Path -LiteralPath (Join-Path $fixtureRoot '.agent-guidance/watcher-error.log')) } 'watcher recovery'
        & $watchScript -Root $fixtureRoot -Iterations 1 | Out-Null
        Stop-Process -Id $script:watchProcess.Id -ErrorAction Stop
        $script:watchProcess.WaitForExit()
        $script:watchProcess = $null
    }

    Run-Case 'a missing local baseline cannot silently select between differing existing peers' {
        Remove-Item -LiteralPath (Join-Path $fixtureRoot '.agent-guidance/state.json')
        Write-Fixture 'AGENTS.md' ((Read-Fixture 'AGENTS.md').Replace('Right conflict', 'Fresh-clone difference'))
        Assert-Fails { & $syncScript -Root $fixtureRoot } 'Conflicting edits'
        & $syncScript -Root $fixtureRoot -ResolveFrom Claude | Out-Null
        & $syncScript -Root $fixtureRoot -Check | Out-Null
    }

    Write-Output "$script:Passed behavior checks passed. All mutations were confined to an isolated temporary Git repository."
}
finally {
    if ($null -ne $script:watchProcess -and -not $script:watchProcess.HasExited) {
        Stop-Process -Id $script:watchProcess.Id -ErrorAction Stop
        $script:watchProcess.WaitForExit()
    }
    $resolvedFixture = [IO.Path]::GetFullPath($fixtureRoot)
    $expectedPrefix = $temporaryBase.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar + 'guidance-tests-'
    if (-not $resolvedFixture.StartsWith($expectedPrefix, [StringComparison]::OrdinalIgnoreCase)) { throw "Refusing cleanup outside the test directory: $resolvedFixture" }
    if (Test-Path -LiteralPath $resolvedFixture) { Remove-Item -LiteralPath $resolvedFixture -Recurse -Force }
}
