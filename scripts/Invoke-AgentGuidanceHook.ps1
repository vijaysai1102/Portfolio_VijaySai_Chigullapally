[CmdletBinding()]
param([ValidateSet('PreCommit', 'Refresh')][string]$Mode)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$repositoryRoot = Split-Path -Parent $PSScriptRoot
if ($Mode -eq 'PreCommit') {
    & (Join-Path $PSScriptRoot 'Sync-AgentGuidance.ps1') -Root $repositoryRoot -Check
    & (Join-Path $PSScriptRoot 'Sync-AgentGuidance.ps1') -Root $repositoryRoot -Check -Staged
}
else {
    & (Join-Path $PSScriptRoot 'Setup-AgentGuidance.ps1') -Root $repositoryRoot
}
