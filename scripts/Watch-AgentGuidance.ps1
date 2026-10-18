[CmdletBinding()]
param(
    [string]$Root,
    [ValidateRange(100, 60000)][int]$IntervalMilliseconds = 2000,
    [ValidateRange(0, 100000)][int]$Iterations = 0
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
if (-not $Root) { $Root = Split-Path -Parent $PSScriptRoot }
$Root = [IO.Path]::GetFullPath($Root)
$localDirectory = Join-Path $Root '.agent-guidance'
if ((Test-Path -LiteralPath $localDirectory) -and ((Get-Item -Force -LiteralPath $localDirectory).Attributes -band [IO.FileAttributes]::ReparsePoint)) {
    throw 'The watcher state directory must not be a link.'
}
[void][IO.Directory]::CreateDirectory($localDirectory)
$watcherLock = $null
try { $watcherLock = [IO.File]::Open((Join-Path $localDirectory 'watcher.lock'), 'OpenOrCreate', 'ReadWrite', 'None') }
catch [IO.IOException] { Write-Output 'A watcher is already running for this checkout.'; return }

$utf8 = New-Object Text.UTF8Encoding($false)
$statusPath = Join-Path $localDirectory 'watcher-status.json'
$errorPath = Join-Path $localDirectory 'watcher-error.log'
$lastError = $null
$completedIterations = 0
$startedAt = (Get-Process -Id $PID).StartTime.ToUniversalTime().ToString('o')
try {
    while ($Iterations -eq 0 -or $completedIterations -lt $Iterations) {
        $status = [ordered]@{ processId = $PID; processStartedAt = $startedAt; root = $Root; checkedAt = [DateTime]::UtcNow.ToString('o'); error = $null }
        try {
            # One persistent process polls both guidance and application content, including missed editor events.
            & (Join-Path $PSScriptRoot 'Sync-AgentGuidance.ps1') -Root $Root
            if ($null -ne $lastError) { Write-Output 'Synchronization recovered.' }
            $lastError = $null
            if (Test-Path -LiteralPath $errorPath) { Remove-Item -LiteralPath $errorPath -Force }
        }
        catch {
            $message = $_.Exception.Message
            $status.error = $message
            if ($message -ne $lastError) {
                [IO.File]::WriteAllText($errorPath, ([DateTime]::UtcNow.ToString('o') + "`n" + $message + "`n"), $utf8)
                Write-Warning $message
            }
            $lastError = $message
        }
        [IO.File]::WriteAllText($statusPath, ($status | ConvertTo-Json) + "`n", $utf8)
        $completedIterations++
        if ($Iterations -eq 0 -or $completedIterations -lt $Iterations) { Start-Sleep -Milliseconds $IntervalMilliseconds }
    }
}
finally { $watcherLock.Dispose() }
