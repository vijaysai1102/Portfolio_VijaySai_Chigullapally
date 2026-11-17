# Codex session handoff

Updated 2026-11-16 after adding the user's approved master's education and GPA; earlier release and Living Campus evidence is retained below.

## Current state

The existing Next.js portfolio and its real AI guide are deployed at https://vijayportfolio-eight.vercel.app. Do not scaffold a replacement or repeat completed tickets. The supplied master's education is now implemented; other personal content remains intentionally deferred.

| Item | Reference |
| --- | --- |
| Checkout | C:\Vijay Sai Chigullapally Portfolio |
| Repository | https://github.com/vijaysai1102/Portfolio_VijaySai_Chigullapally |
| Branch | main; verified commits are pushed under the user's standing authorization |
| Vercel project | vijay_portfolio |
| Initial verified live-AI source | 46ac373eaff287586bdddc2dbc4928e9d27a8b2a; Living Campus is added by the later commit containing this update |
| Initial verified live-AI deployment | dpl_FpYVFwXad9a6xzLoFGGDSqkqAxzB; inspect current main/deployment before continuing |
| Previous production, AI off | dpl_84ZDQM7SyDSqzBtV2Jjmgkzrk3jx, same application source |
| Model | gemini-3.5-flash-lite |
| Approved public request caps | 25/day, 250/month, 6/session |
| Approved spend | Up to $1 for testing; $5 monthly public-Gemini target. Request caps are not an exact invoice guarantee |
| Production storage | Owner-created permanent Upstash Redis, separate from the temporary preview database |
| Preview configuration | Both AI flags false for new deployments after the trial; scratch Redis expires 2026-11-18 |

These references are a dated snapshot. Later documentation commits can trigger new Vercel deployments of unchanged application code. Check current Git, CI, deployment identity and public health before acting.

## Recovered interruption

Session **Review handoff doc**, ID `01a1de13-b9a7-7621-bd0c-68c3cc13ae3c`, hit its usage limit on 2026-11-15 at 09:03 UTC, while attempting production activation. Later resume attempts failed authentication. Its saved local history and ignored verification artifacts survived the restart.

Before interruption it had completed the implementation fixes, 32-case quality review, 11 critical repeats, real-store tests, protected cloud browser flow and an isolated deployed disable-switch drill. The recovery session verified the existing source, completed production configuration/redeployment and exercised a real answer/source/action on the public site. No new personal facts or application code were added during recovery.

Read next: root AGENTS.md, generated .agents/project-context.md, docs/launch-status.md, docs/ticket-records.md, then the focused document for the requested task. Historical records that say AI is offline are superseded by the release entry and current launch status.

## Decisions to preserve

- The user authorized sequential implementation, verification, commit and push to main after each ticket. The implementation plan's execution amendment supersedes its older per-ticket stop instruction. Routine work within that approval does not require another gate.
- For a new multi-file or visible change, name the files, intended changes and preserved behavior; follow current root approval rules.
- Do not infer employment, education, certifications, contact details, ownership or personal contributions from repository presence or historical planning material. Empty sections and the neutral graphic are intentional.
- Preserve navigation, focus, keyboard interaction, responsive layouts, reduced motion, working destinations and the sample explorer contract. Inventory affected hover/animation/pointer behavior before changing UI.
- Never restore or derive a design from the permanently rejected portfolio-mockup.jpg.
- Keep secrets and raw synthetic review records out of tracked/public files. Do not request credentials in chat.

## Implemented features and source map

| Area | Main files |
| --- | --- |
| Pages/shell/metadata | src/app/page.tsx, layout.tsx, not-found.tsx, projects/[slug]/page.tsx, robots.ts, sitemap.ts, share/route.tsx |
| Public facts/validation | src/content/portfolio.ts, model.ts |
| Studio and sections | src/components/header.tsx, hero.tsx, work.tsx, additional-work.tsx, about.tsx, experience.tsx, credentials.tsx, contact.tsx, footer.tsx; src/app/globals.css |
| Artwork/primitives | src/components/project-art.tsx, primitives.tsx |
| Sample explorer | src/components/megatron-demo.tsx, use-demo-view.ts; src/lib/demo.ts |
| Guide UI/conversation | src/components/guide.tsx, use-guide.ts; src/lib/conversation.ts, chat-contract.ts |
| Evidence and navigation | src/lib/knowledge.ts, grounding.ts, guide-actions.ts, guide-display.ts, guide-stream.ts |
| Chat API/adapters | src/app/api/chat/route.ts; src/lib/server/gemini.ts, request.ts, sse.ts, usage.ts |
| Verification/deployment | tests/portfolio.test.ts, scripts/Smoke-Portfolio.mjs, .github/workflows/portfolio.yml, vercel.json |
| Guidance | scripts/Setup-AgentGuidance.ps1, Sync-AgentGuidance.ps1, Watch-AgentGuidance.ps1, Test-AgentGuidance.ps1 |

The light studio uses locally hosted DM Sans/Manrope fonts, olive accents, a neutral engineering graphic, responsive navigation, four substantive case pages and PingBack as additional work. Living Campus is the fourth selected project at /projects/living-campus, with a labeled conceptual illustration and source/app links. Its upstream source review is pinned in content-evidence.md; no live NPC conversation or upstream gameplay was reproduced. GitHub is the supplied contact path. No email or resume is published.

The project model has an optional validated HTTPS website field. Case pages preserve Megatron's Product website label and use Open the app for Living Campus. Guide page context and quick links now derive from project data; chat boundary IDs and topic/evidence aliases still need an explicit addition for a new project. The fallback unknown answer also derives its project list from public content. Do not mistake Living Campus's fictional Westbrook University for supplied personal education.

Megatron's independent fictional sample supports overview, skills and usage, search/empty/reset states and an expanded native dialog. Canonical fragments are #demo-overview, #demo-skills and #demo-usage. It performs no desktop/plugin operations and has no remote postMessage contract. See demo-integration.md.

Guide suggestions resolve registered destinations and require visitor selection; they do not execute tools. Browser chat is memory-only. Unknown personal facts use an explicit local answer. Gemini uses SSE upstream; the browser receives application/x-ndjson. Preserve final source/action validation, cancellation, bounded input/history and fail-closed usage reservation. Failed/cancelled provider attempts consume reserved allowance. Reset/reload does not reset the quota cookie. See ai-policy.md and usage-controls.md.

WeatherScope numbers are attributed to its saved report; the pipeline was not rerun. F1 architecture is source-reviewed, not proof of a reproduced regulatory answer. Preserve these limits.

## Verification evidence

- Education follow-up: final Windows lint/types/33 tests/build/production HTTP smoke, guidance and whitespace checks passed. Inspected desktop/mobile education screenshots and 320px reflow with no overflow or captured console errors. Education/GPA profile routing and Living Campus separation have failing-then-passing coverage; “case study” retains project context. Orca refused a new Tab check because its keyboard-focus guard was unavailable; no new visible keyboard-focus result is claimed. Inspect this commit's CI/deployment and live answer after push; earlier broad audits remain historical evidence.

- Latest Living Campus context/citation follow-up: all 31 tests plus lint/types/build/HTTP smoke and secret scan passed. Generic retrieval/RAG questions now retain current/prior project context; explicit new project names still win, and context-free RAG keeps its F1 default. Citation spacing is canonicalized only to source IDs in the supplied evidence registry. Both issues had failing-then-passing regressions; eight targeted real-model cases passed after fixes. The earlier UI screenshots/audit cover unchanged presentation. Check the latest follow-up commit's CI/deployment after push.

- Living Campus follow-up: local lint/types/29 tests/build/all-case HTTP smoke and static-secret scan passed; three added behavioral tests were observed failing before implementation and passing after, alongside the updated project-catalog expectation. The build required leaving the filesystem sandbox after a generated-output EPERM; no application change repaired that environmental failure. Inspected 1440px home, 390px case/chat and 320px card screenshots; keyboard card/highlight navigation, hover, page-context answers and existing Megatron Skills/product destinations passed. Six real targeted guide cases passed against isolated preview storage. Focused axe reported zero violations with manual contrast items; reduced-motion emulation passed. See the current commit's CI/deployment status after push; earlier full evaluation results below remain historical evidence.

- Fresh recovery-session Windows Node 22.23.2 lint, typecheck, all 26 tests, build and production HTTP smoke passed. The first sandboxed smoke timed out on loopback despite server readiness; the unchanged smoke passed outside that network sandbox after process/port inspection.
- Application CI at reviewed source passed Windows/macOS/Linux; guidance CI passed Windows/Linux. Earlier 18 guidance regressions and dev-start guidance-hash preservation remain recorded evidence, not newly repeated tests.
- Previous session's recorded live quality review: 32/32 after fixes/targeted reruns and 11 independent critical repeats. Conservative quality-runner token estimate was under $0.20, excluding other browser/deployment calls; this is not an invoice.
- Real isolated Redis checks covered independent-process daily concurrency, session/monthly races, actual TTLs, shortened-key expiry, injected UTC rollover and failure/recovery. Invalid real provider credential failed visibly and consumed its reservation.
- Protected cloud preview verified a generated answer/source, exact Skills suggestion, project navigation, stop after reservation, retry without duplicate user input, reset without allowance reset and six-request session exhaustion. Disable drill returned available=false/POST=503 with homepage=200 on another isolated deployment.
- Public release returned available=true; home, three cases, robots, sitemap and sharing image returned 200; cross-origin POST returned 403. Actual public browser question generated fictional Skills content, its source and /projects/megatron#demo-skills suggestion. Selecting it activated Skills and closed the guide. Desktop 880px/mobile 390x844 screenshots were inspected; no horizontal overflow or captured console errors. Escape returned focus to launcher. One request showed five questions remaining. Static/public secret scan matched no configured credentials.
- Earlier broader browser review covered 320/390/768/1440 widths, navigation/demo/offline states and reduced motion. Axe reported zero violations in reviewed states, with manual contrast items. Mobile Lighthouse measured home 96 performance and Megatron 92, accessibility 100, zero CLS. These earlier results are not new full audits or field metrics.

Still unverified: manual screen-reader review, native 200%/400% browser zoom, physical mobile touch/virtual keyboard, external social-cache preview and disruptive production rollback. Do not claim WCAG certification or physical-device verification from emulation.

## Commands and local lessons

Use PowerShell, Node 22, npm and explicit UTF-8 I/O. Run setup at session start. Do not change global execution policy or NVM selection.

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Setup-AgentGuidance.ps1
git status --short --branch
npm.cmd ci
npm.cmd run dev
npm.cmd run check
npm.cmd run smoke
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Sync-AgentGuidance.ps1 -Check
git diff --check
```

Run Test-AgentGuidance.ps1 for synchronization behavior changes. Smoke starts/stops its own server on 3100 and forces AI off to avoid paid calls. Do not run dev/build concurrently against .next or audit an old server after rebuilding. Stop only verified owned processes. Setup maintains the guidance watcher; leave it running. Never stage generated ignored next-env.d.ts. Next agentRules remains disabled to avoid a second guide writer.

## Private configuration and recovery

Server-only settings: GEMINI_API_KEY, GEMINI_MODEL, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, AI_DAILY_REQUEST_LIMIT, AI_MONTHLY_REQUEST_LIMIT, AI_SESSION_REQUEST_LIMIT, AI_ENABLED and AI_RELEASE_APPROVED. Defaults remain unconfigured/off in .env.example. Production now has both flags true under the approved release.

Ignored .env.local contains local/preview settings; ignored .agent-guidance/production.env holds the owner's permanent Redis settings. Vercel received private values through authenticated CLI stdin. Never print the files, credential values, cookies or full environment dumps. Preview storage must stay separate. Temporary verification scripts under .agent-guidance are recovery artifacts, not supported app commands or guaranteed fresh-clone dependencies.

To disable generation, set both Production flags false and redeploy; verify available=false, valid POST=503 and working ordinary routes. This behavior passed the isolated cloud drill. Do not conduct a disruptive public rollback merely to complete a checklist. Confirm a known-good revision/deployment before future changes. Follow deployment.md, launch-status.md and maintenance.md.

## Remaining work

The interrupted live-AI task is complete. The user approved University of North Texas, Master’s in Computer Science and Engineering, August 2024 – May 2026, GPA: 4.0. It is stored in profile.education, rendered through the existing credential section and included in guide profile evidence; no GPA scale or personal story was inferred. Further personal content needs supplied facts/assets: biography, experience, any additional education, certifications, portrait, email and resume. Do not manufacture them to close original tickets. Complete the manual/device checks when suitable tools/devices are available; do not describe the entire original 36-ticket plan as fully closed while these acceptance items remain deferred.

For the next requested change: inspect relevant source and user edits, apply existing approvals, verify real behavior, update evidence/guidance, commit/push the completed scope, and inspect CI/deployment. Preserve both guidance peers and generate context using Sync-AgentGuidance.ps1; never hand-edit generated fingerprints.
