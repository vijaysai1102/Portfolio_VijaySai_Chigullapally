# Vijay Sai Chigullapally Portfolio

The portfolio website will be added here. No application framework or development command is configured yet.

## Shared agent guidance

`CLAUDE.md` and `AGENTS.md` contain matching project instructions. Shared skills live in both `.claude/skills/` and `.agents/skills/`. Edit either peer; synchronization uses a saved baseline to identify which side changed, including skill additions, renames, binary supporting files, and deletions. The root guides link to the shared skills and context. Tool-specific settings remain separate.

The setup adapts [Megatron's shared guidance](https://github.com/Megatron-HQ/Megatron/tree/7b80bd3d2be285734312a9eb8d008c65c09b8e4c) for this portfolio. It replaces Megatron's one-way commit-time copies with a local watcher and conflict detection. It does not sync with the upstream Megatron repository.

### Start automatic synchronization

From this checkout on Windows:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Setup-AgentGuidance.ps1
```

This performs an initial sync, installs repository-local Git hooks, and starts one hidden watcher for this checkout. It polls every two seconds, catches changes from any editor, and keeps both root guides, both shared skill folders, and generated context current. Rerunning setup is safe. The process-level execution-policy flag does not change your system policy.

Run setup after a restart or in a new clone. Checkout/merge hooks and the instructions for future agents also start it. Nothing is installed globally or registered to start at Windows sign-in. Setup with `-NoWatch` installs hooks and synchronizes once. On other operating systems, use PowerShell 7 (`pwsh`) and run `./scripts/Watch-AgentGuidance.ps1` in a terminal for live updates.

Watcher health and conflicts appear in `.agent-guidance/watcher-status.json` and `.agent-guidance/watcher-error.log`; local state is ignored by Git. To stop the watcher, read its status, verify that the reported PID and process start time still identify this checkout's PowerShell watcher, then use `Stop-Process -Id <verified-pid>`. Setup restarts it when needed.

### Code changes and generated context

When application source or configuration changes, synchronization updates the generated section in both root guides and both `.claude/project-context.md` and `.agents/project-context.md` files. It records detected framework dependencies, actual package scripts, lockfiles, a source-file inventory, and a content fingerprint. It never runs package scripts. Git-ignored files, `.env` files, dependency trees, generated output, and guidance infrastructure are excluded.

Automatic context describes observable code facts. Update the human-written guidance and relevant skills when architecture, workflows, or verification requirements change. The scripts cannot infer those decisions from a code diff.

### Check and resolve

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Sync-AgentGuidance.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Sync-AgentGuidance.ps1 -Check
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Test-AgentGuidance.ps1
```

If both peers change differently before a sync, synchronization stops before copying or deleting any shared files. Review the files and make them agree, or explicitly choose the reviewed version:

```powershell
./scripts/Sync-AgentGuidance.ps1 -ResolveFrom Claude
./scripts/Sync-AgentGuidance.ps1 -ResolveFrom Agents
```

Use the same PowerShell invocation prefix as above if your shell policy requires it. `-ResolveFrom` selects that side for every differing shared pair in the run, including deletions; review the entire difference first. Root guides are restored from the surviving peer if one is deleted. Generated context is always rebuilt.

Local baseline state is deliberately untracked. On a fresh clone, matching peers establish a new baseline. Differing existing peers without a baseline require review; the tool does not choose by modification time. Corrupt state and linked/reparse-point paths fail visibly rather than being silently reset or followed.

Pre-commit validates the working tree and staged files separately, including context computed from staged application code. It never stages files. If it blocks a partial commit, run synchronization, review the changes, and explicitly stage the matching guides, skills, and context with that code change. The Git index is not changed by checks. Git hooks require Git plus PowerShell; their tiny executable launchers delegate all behavior to `scripts/Invoke-AgentGuidanceHook.ps1`.

The GitHub workflow runs behavior tests and checks committed guidance on pushes and pull requests, without write permissions or automatic commits. It becomes active after these files are committed and pushed. Stale guidance causes a visible CI failure; GitHub does not silently edit your branch.
