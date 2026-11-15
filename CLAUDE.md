# Vijay Sai Chigullapally Portfolio

This repository will contain Vijay Sai Chigullapally's personal portfolio. Follow the actual code and the generated project context below for the chosen framework and available commands. Do not import Megatron's Electron, SQLite, IPC, packaging, or product constraints.

## Before working

- Read this guide and [project context](.claude/project-context.md) (also available at [.agents/project-context.md](.agents/project-context.md)). Run `powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Setup-AgentGuidance.ps1` at the beginning of a local Windows session to synchronize guidance and ensure the background watcher is running. On another OS, use `pwsh` and run the watcher in a terminal if needed.
- Inspect only the files relevant to the task and their direct dependencies. Check Git status and preserve user changes.
- Treat questions, analysis, and pasted specifications as read-only unless changes are explicitly authorized.
- Before editing more than one file or making a browser-visible UI change, name the files, intended changes, and behavior to preserve. Wait for approval. Approval already given for that plan persists; routine implementation choices within it do not need another approval.

## Windows development

- Use PowerShell, absolute paths in scripts/configuration, quoted paths with spaces, and `-LiteralPath` for exact filesystem paths. Prefer `rg` for fast searches when available; otherwise use native PowerShell commands.
- Do not assume Bash, WSL, Unix utilities, or Unix command flags. The tiny `.githooks/` shell launchers exist only because Git requires an executable entry point; all hook behavior lives in PowerShell.
- After a shell, dependency, path, or permission failure, verify the shell, executable, working directory, quoting, and permissions before another attempt. Do not modify global execution policy.

## Portfolio behavior and content

- Use the existing framework, package manager, lockfile, commands, and conventions once the portfolio is added. Do not invent an app scaffold or select a stack while doing an unrelated task.
- Before adding UI near hover effects, animation, or pointer behavior, inventory those interactions and state how each is preserved or intentionally changed. Identify required changes to existing styles and classes explicitly.
- Preserve navigation, keyboard interaction, focus states, responsive layouts, reduced-motion support, and working project/contact links unless the approved task changes them.
- Use supplied facts for biography, education, projects, contact details, and resume content. Ask for missing facts instead of inventing claims. Keep secrets and private documents out of public assets and client bundles.
- Favor semantic HTML and accessible controls. Verify narrow and wide layouts and relevant loading, empty, error, hover, and focus states.

## Implementation and verification

- Next's generated next-env.d.ts is ignored and excluded from the context fingerprint. Do not stage it. agentRules is disabled because this repository owns and mirrors its guides; next dev must not add a second guide writer. Read/write source and Markdown explicitly as UTF-8 on Windows.

- `.github/workflows/portfolio.yml` repeats lockfile installation, all app checks, and real production HTTP smoke on Windows, macOS, and Linux. Local checks must pass before pushing; CI adds platform coverage. `vercel.json` targets Next.js at the repository root. Keep preview/production configuration separate and follow `docs/deployment.md`; neither a local build nor mocked provider/storage tests establish a verified deployment.

- The app uses Next.js App Router, React, TypeScript and npm. Use `npm.cmd ci`, `npm.cmd run dev`, `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test`, and `npm.cmd run build` on Windows. `npm.cmd run check` runs the four checks sequentially. Source areas: `src/app` (routes), `src/components` (UI), `src/content` (public facts), `src/lib` (validated logic). Tests use Node test through tsx. Server secrets stay in ignored `.env.local`; AI defaults off. Generated context is synchronized after each ticket. Chat on 2026-11-14 authorizes sequential implementation and a verified commit/push to main for each ticket without another approval gate; personal facts await chat inputs. Browser verification limitations must be recorded before pushing.

- Keep functions focused and modules decoupled. Validate boundary inputs, use descriptive names and early returns, and handle specific errors visibly. Prefer pure functions and small local state.
- Extract non-obvious configuration into named constants or environment variables. Comments explain reasons that names and structure cannot express.
- Use the `test-driven-development` skill for meaningful application logic or synchronization behavior. A regression test should reproduce an observable failure. Prose, simple styling, constants, and reversible configuration do not need tests that merely copy their implementation.
- Use `visual-verify` after a portfolio UI change. Run the actual site and exercise the changed flow; lint and type checks alone do not prove it works. State clearly when execution or rendering could not be verified.
- When browser/screenshot usage is known to exceed 50% of a constrained allowance, state that and obtain approval before further use unless already authorized.
- Run checks appropriate to the change. Fix regressions caused by the change and report unrelated failures. Do not claim verification that was not performed.

## Keeping guidance current

- `CLAUDE.md` and `AGENTS.md` are equal, editable peers. `.claude/skills/` and `.agents/skills/` are equal, editable peers, including supporting files. Edit either side; the watcher propagates changes, additions, renames, and skill-file deletions. Tool-specific files such as `.claude/settings.json` stay with their tool.
- The generated context section below and both `project-context.md` files are maintained by `scripts/Sync-AgentGuidance.ps1`. It discovers repository facts and fingerprints code; it cannot infer architectural intent or rewrite human decisions. Update the manual guidance and relevant skills when a code change alters workflows, architecture, routes, commands, or verification requirements.
- Never hand-edit generated context. Resolve an actual two-sided conflict by making the peers agree, or explicitly run `Sync-AgentGuidance.ps1 -ResolveFrom Claude` or `-ResolveFrom Agents` after reviewing which version to keep. No timestamp-based winner is chosen.
- Run `Sync-AgentGuidance.ps1 -Check` before finishing. Stage the changed counterparts and generated context deliberately. Pre-commit checks both disk and the Git index and never stages files on your behalf. CI checks committed content independently of local watcher state.
- The watcher is local to this checkout. Setup starts it in the background on Windows; rerun setup after a restart. Git checkout/merge hooks restart it, and future agents should run setup as directed above. GitHub checks take effect once these files are committed and pushed.

## Local skills

- [grill-me](.claude/skills/grill-me/SKILL.md): stress-test a portfolio plan when requested.
- [test-driven-development](.claude/skills/test-driven-development/SKILL.md): verify meaningful logic with failing-then-passing behavioral tests.
- [visual-verify](.claude/skills/visual-verify/SKILL.md): verify the running portfolio and preserve existing interactions.

Adapted from [Megatron](https://github.com/Megatron-HQ/Megatron/tree/7b80bd3d2be285734312a9eb8d008c65c09b8e4c), especially its shared guides, three skills, and mirror hook. The portfolio uses two-way synchronization and a live watcher rather than Megatron's commit-time, one-way generation.

<!-- agent-context:start -->
# Generated project context

Generated from the current repository by `scripts/Sync-AgentGuidance.ps1`. Do not edit this section or either project-context.md file by hand.

## Application

Package: `vijay-portfolio`.
Detected framework/tool dependencies: next, react.

### Package scripts

- `build`: `next build`
- `check`: `npm run lint && npm run typecheck && npm test && npm run build`
- `dev`: `next dev --hostname 127.0.0.1`
- `lint`: `eslint .`
- `smoke`: `node scripts/Smoke-Portfolio.mjs`
- `start`: `next start --hostname 127.0.0.1`
- `test`: `tsx --test tests/portfolio.test.ts`
- `typecheck`: `tsc --noEmit`

Lockfiles: package-lock.json. Use the matching package manager; investigate mixed lockfiles.

## Code and configuration inventory

Content fingerprint (SHA-256, text line endings normalized): `a85cf040125f7d50e30431c8c5152255807dba93e9c201699b212218f9f5cf46`.

- `docs/homepage-concept.html`
- `eslint.config.mjs`
- `next.config.ts`
- `package.json`
- `scripts/Smoke-Portfolio.mjs`
- `src/app/api/chat/route.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/app/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/robots.ts`
- `src/app/share/route.tsx`
- `src/app/sitemap.ts`
- `src/components/about.tsx`
- `src/components/additional-work.tsx`
- `src/components/contact.tsx`
- `src/components/credentials.tsx`
- `src/components/experience.tsx`
- `src/components/footer.tsx`
- `src/components/guide.tsx`
- `src/components/header.tsx`
- `src/components/hero.tsx`
- `src/components/megatron-demo.tsx`
- `src/components/primitives.tsx`
- `src/components/project-art.tsx`
- `src/components/use-demo-view.ts`
- `src/components/use-guide.ts`
- `src/components/work.tsx`
- `src/content/model.ts`
- `src/content/portfolio.ts`
- `src/lib/chat-contract.ts`
- `src/lib/contact.ts`
- `src/lib/conversation.ts`
- `src/lib/demo.ts`
- `src/lib/grounding.ts`
- `src/lib/guide-actions.ts`
- `src/lib/guide-display.ts`
- `src/lib/guide-stream.ts`
- `src/lib/knowledge.ts`
- `src/lib/server/gemini.ts`
- `src/lib/server/request.ts`
- `src/lib/server/site.ts`
- `src/lib/server/sse.ts`
- `src/lib/server/usage.ts`
- `tests/portfolio.test.ts`
- `tsconfig.json`
- `vercel.json`

Git-ignored files, environment files, generated output, dependency trees, and guidance infrastructure are excluded. This inventory does not execute package scripts or infer design decisions. Update manual guidance when code changes alter how the project should be developed or verified.
<!-- agent-context:end -->
