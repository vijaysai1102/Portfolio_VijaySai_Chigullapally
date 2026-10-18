[CmdletBinding()]
param(
    [string]$Root,
    [switch]$NoWatch
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
if (-not $Root) { $Root = Split-Path -Parent $PSScriptRoot }
$Root = [IO.Path]::GetFullPath($Root)
& (Join-Path $PSScriptRoot 'Sync-AgentGuidance.ps1') -Root $Root

$configuredHooks = & git -C $Root config --get core.hooksPath
if ($LASTEXITCODE -notin @(0, 1)) { throw 'Could not read Git hook configuration.' }
if ($configuredHooks -and $configuredHooks -ne '.githooks') {
    throw "Existing core.hooksPath is '$configuredHooks'. Preserve it and integrate these hooks explicitly before setup."
}
& git -C $Root config --local core.hooksPath .githooks
if ($LASTEXITCODE -ne 0) { throw 'Could not install repository-local Git hooks.' }
Write-Output 'Repository-local Git hooks installed.'
if ([Environment]::OSVersion.Platform -ne [PlatformID]::Win32NT) {
    foreach ($hook in @('pre-commit', 'post-checkout', 'post-merge')) {
        $hookPath = Join-Path (Join-Path $Root '.githooks') $hook
        if (Test-Path -LiteralPath $hookPath) {
            $permissions = [IO.File]::GetUnixFileMode($hookPath)
            [IO.File]::SetUnixFileMode($hookPath, ($permissions -bor [IO.UnixFileMode]::UserExecute))
        }
    }
}
if ($NoWatch) { return }

if ([Environment]::OSVersion.Platform -ne [PlatformID]::Win32NT) {
    Write-Output 'Run pwsh -NoProfile -File ./scripts/Watch-AgentGuidance.ps1 in a terminal for live synchronization on this OS.'
    return
}
$localDirectory = Join-Path $Root '.agent-guidance'
$probe = $null
try { $probe = [IO.File]::Open((Join-Path $localDirectory 'watcher.lock'), 'OpenOrCreate', 'ReadWrite', 'None') }
catch [IO.IOException] {
    $statusPath = Join-Path $localDirectory 'watcher-status.json'
    if (Test-Path -LiteralPath $statusPath) { Write-Output ([IO.File]::ReadAllText($statusPath)) }
    Write-Output 'The guidance watcher is already running. See .agent-guidance/watcher-status.json and watcher-error.log for its health.'
    return
}
finally { if ($null -ne $probe) { $probe.Dispose() } }

$enginePath = (Get-Process -Id $PID).Path
$watcherPath = Join-Path $PSScriptRoot 'Watch-AgentGuidance.ps1'
$arguments = '-NoProfile -NonInteractive -ExecutionPolicy Bypass -File "' + $watcherPath + '" -Root "' + $Root.TrimEnd('\') + '"'
$process = Start-Process -FilePath $enginePath -ArgumentList $arguments -WindowStyle Hidden -WorkingDirectory $Root -PassThru
$statusPath = Join-Path $localDirectory 'watcher-status.json'
$deadline = [DateTime]::UtcNow.AddSeconds(15)
do {
    if ($process.HasExited) { throw 'The guidance watcher exited during startup. Run Watch-AgentGuidance.ps1 in a terminal to inspect the error.' }
    if (Test-Path -LiteralPath $statusPath) {
        try {
            $status = [IO.File]::ReadAllText($statusPath) | ConvertFrom-Json
            if ($status.processId -eq $process.Id) {
                if ($status.error) { throw "The watcher started with an error: $($status.error)" }
                Write-Output "Guidance watcher running (PID $($process.Id)); polling every two seconds."
                return
            }
        }
        catch [ArgumentException] { }
    }
    Start-Sleep -Milliseconds 200
} while ([DateTime]::UtcNow -lt $deadline)
throw 'The guidance watcher did not publish startup status within 15 seconds.'
