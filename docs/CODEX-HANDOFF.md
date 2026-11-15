# Codex session handoff

Prepared on 2026-11-15 for continuing Vijay Sai Chigullapally's portfolio in another Codex session.

## 1. Start here

The portfolio is implemented and deployed. Continue from the existing Next.js application and its written plan; do not scaffold a replacement or repeat the completed build.

| Item | Current reference |
| --- | --- |
| Checkout | `C:\Vijay Sai Chigullapally Portfolio` |
| Shell | PowerShell on Windows |
| Repository | https://github.com/vijaysai1102/Portfolio_VijaySai_Chigullapally |
| Working branch | `main` |
| Live site | https://vijayportfolio-eight.vercel.app |
| Vercel project | `vijay_portfolio` |
| Source baseline before this document | `c412ca686f713ab1e1c539cf37dac03d4e418409` |
| Baseline Git state | Clean; implementation and follow-up commits pushed to `origin/main` |
| Public AI guide | Offline; the ordinary portfolio works independently |

This is a dated snapshot. Check current Git status, source, CI and deployment state before acting. The commit containing this handoff follows the baseline above.

Read these in order:

1. Root [AGENTS.md](../AGENTS.md) and generated [project context](../.agents/project-context.md).
2. This handoff and [launch status](launch-status.md) for current state.
3. [Implementation plan](portfolio-implementation-plan.md) for the original T01–T36 scope and execution amendment.
4. [Ticket records](ticket-records.md) for implementation evidence and later follow-ups.
5. The focused technical document relevant to the next requested task.

Earlier ticket records describe a time when the browser was unavailable and Vercel was not connected. Later follow-ups and launch-status.md supersede those historical deployment/browser limitations. Do not conclude that the site is undeployed from an old ticket entry or an empty GitHub deployments list.

## 2. User decisions to preserve

- Build from the existing written plan. The user chose to review and change the result after implementation.
- Ignore FDE and other inferred career positioning in the planning material. Use only personal facts supplied by the user in chat when needed.
- Do not infer employment, education, certifications, portrait, resume, email, project ownership or personal contributions from repository presence or old planning text.
- Empty personal sections and the neutral graphic are intentional until the user supplies approved content. They are not reasons to populate sample biography data.
- The user authorized sequential ticket implementation, verification, a commit and a push to `main` after each ticket. That authorization persists within the approved work. Inspect new instructions and user changes before continuing.
- Before multi-file or visible UI changes, name affected files, intended changes and behavior to preserve. Follow the root guide's approval rules; routine choices within an already approved plan do not need another gate.
- Preserve navigation, focus, responsive layouts, reduced motion, link destinations and existing interactions. Inventory affected hover, animation and pointer behavior before changing it.
- Complete applicable local checks before every push. CI supplies additional platform coverage. Do not substitute CI, mocked service responses or an HTTP 200 for browser/live-service verification.

## 3. What is implemented

### Public portfolio

- A light studio design with olive accents, responsive typography and locally hosted DM Sans/Manrope fonts.
- Hero with an original engineering-orbit/monogram graphic and an optional portrait integration point.
- Responsive header, mobile menu, skip link, footer, contact section and custom 404.
- Featured Megatron, WeatherScope AI and F1 Regulations RAG cards and substantive shared-template case pages.
- PingBack as additional work with a source link.
- About/approach copy that makes no unsupported career claims.
- Empty experience, education and certification collections; absent personal sections are omitted publicly.
- Optional validated resume/email support. Neither a resume nor an email has been supplied; GitHub is the working contact path.
- Original conceptual project artwork. The Megatron illustration and explorer use labeled sample data.

### Megatron sample explorer

This is a small independent illustration, not the desktop app, an embedded third-party preview or a working plugin manager. It accesses no local files and performs no plugin operations.

- Overview, Skills and Usage views.
- Search, an empty state, clear/reset controls and an expanded native dialog.
- Canonical fragments: `#demo-overview`, `#demo-skills`, `#demo-usage`.
- View changes clear the old view's search; reset returns to Overview with empty search.
- Validated guide action identifiers can link to these local states.
- No `postMessage` bridge or remote preview-control contract exists.

See [demo integration](demo-integration.md) before modifying this behavior.

### Optional AI guide

The source implementation exists, but a live Gemini/Redis integration has not been evaluated or released.

- Native dialog with launcher, bounded in-memory conversation state, input and stream controls, source links, suggested actions, offline/error/limit states and focus return.
- Server-only Gemini adapter, evidence selection, grounding/citation checks, missing-fact handling and bounded conversation context.
- Server/client validation of known navigation and demo actions. Suggestions require a visitor click; the model cannot execute arbitrary code, selectors or external URLs.
- Durable Redis REST usage reservation through a single atomic Lua operation over daily, monthly and session counters. Storage errors fail closed; there is no process-local quota fallback.
- Request-body/history limits, same-origin checks, cancellation and provider timeout/error handling.
- Provider stream parsing uses SSE; the portfolio's browser-facing response is newline-delimited JSON (`application/x-ndjson`). Preserve that transport distinction.

Observed production behavior: `GET /api/chat` returns `{"available":false}`; a valid same-origin POST returns 503 with the offline message. This is the intended current state, not proof of a working live model connection.

## 4. Source map

| Area | Files and responsibility |
| --- | --- |
| Root page and shell | `src/app/page.tsx`, `layout.tsx`, `not-found.tsx` |
| Shared styling | `src/app/globals.css` |
| Header/footer/hero | `src/components/header.tsx`, `footer.tsx`, `hero.tsx` |
| Public facts and projects | `src/content/portfolio.ts`; project validation in `src/content/model.ts` |
| Public sections | Components `work`, `additional-work`, `about`, `experience`, `credentials`, `contact` |
| Case routes | `src/app/projects/[slug]/page.tsx` |
| Artwork/primitives | `src/components/project-art.tsx`, `primitives.tsx` |
| Explorer and URL state | `src/components/megatron-demo.tsx`, `use-demo-view.ts`; pure data/filter helpers in `src/lib/demo.ts` |
| Guide UI/state | `src/components/guide.tsx`, `use-guide.ts` |
| Guide input/context | `src/lib/chat-contract.ts`, `conversation.ts` |
| Evidence and grounding | `src/lib/knowledge.ts`, `grounding.ts` |
| Guide display/actions/transport | `src/lib/guide-display.ts`, `guide-actions.ts`, `guide-stream.ts` |
| API orchestration | `src/app/api/chat/route.ts` |
| Server adapters and boundaries | `src/lib/server/gemini.ts`, `request.ts`, `sse.ts`, `usage.ts` |
| Search and social metadata | `src/lib/server/site.ts`, `src/app/robots.ts`, `sitemap.ts`, `share/route.tsx` |
| Application tests | `tests/portfolio.test.ts` |
| Real production HTTP smoke | `scripts/Smoke-Portfolio.mjs` |
| Guidance synchronization | `scripts/Setup-AgentGuidance.ps1`, `Sync-AgentGuidance.ps1`, `Watch-AgentGuidance.ps1`, `Test-AgentGuidance.ps1` |
| Deployment and CI | `vercel.json`, `.github/workflows/portfolio.yml`, guidance workflow under `.github/workflows/` |

Project sections feed the case pages and AI evidence. Keep content and knowledge consistent. Source review is distinguished from runtime reproduction: WeatherScope's saved metrics were read from its report, the pipeline was not rerun, and no live F1 regulatory answer was reproduced. Preserve those limits and attribution.

## 5. Session startup and local commands

The app uses Next.js 16.4.6, React 19.3.1, TypeScript 5.9 and npm with `package-lock.json`. Local verification used Node 22.23.2. Do not change the user's global Node selection or execution policy to repair a session.

```powershell
Set-Location -LiteralPath 'C:\Vijay Sai Chigullapally Portfolio'
git status --short
git branch --show-current
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Setup-AgentGuidance.ps1
node.exe --version
npm.cmd --version
```

If the shell resolves the wrong installed Node, this checkout was verified with the following session-only PATH adjustment. Check that the directory still exists before using it:

```powershell
$env:Path = 'C:\Users\vijay\AppData\Local\nvm\v22.23.2;' + $env:Path
```

Install when needed, then start development:

```powershell
npm.cmd ci
npm.cmd run dev
```

Development URL: http://127.0.0.1:3000. Run verification from another terminal after stopping owned servers when necessary:

```powershell
npm.cmd run check
npm.cmd run smoke
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Test-AgentGuidance.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Sync-AgentGuidance.ps1 -Check
git diff --check
```

Inspect every result. `check` runs lint, typecheck, application tests and production build sequentially. Run guidance behavior tests when changing guidance/synchronization; the final synchronization check is required before finishing.

`smoke` starts its own production server on port 3100 and stops its own child afterward. It forces both AI release flags off, verifies real pages/API/semantic markup/local fonts/share output, and saves the share PNG under ignored `.agent-guidance/`. Run `npm.cmd start` separately when a browser review needs a persistent production server.

Important local lessons:

- A previously running Next server can serve cached HTML after a new build. Stop the verified owned server and restart it before auditing a changed production build. Do not kill unrelated Node processes.
- Avoid concurrent dev/build processes writing the same `.next` output.
- Use PowerShell, quoted paths, `-LiteralPath`, and explicit UTF-8 for source/Markdown I/O.
- `next-env.d.ts` is generated, ignored and excluded from context discovery. Do not stage it.
- `next.config.ts` has `agentRules: false` to prevent Next from appending a second guide writer's block to this repo's synchronized guides.
- Keep ESLint 9 until the Next lint plugin peer range supports a verified upgrade. Its deprecation notice is known. A scoped `@typescript-eslint/typescript-estree` override pins `minimatch` 11.0.1 and resolved the development advisories; do not casually remove it or force an ESLint major upgrade.

## 6. Verification already completed

These results belong to the verified baseline and follow-ups. Recheck changed behavior; do not present old results as fresh tests.

| Check | Recorded result |
| --- | --- |
| Clean npm lockfile installation | Passed on Windows Node 22.23.2 |
| Lint/typecheck/build | Passed |
| Application tests | 22 passed |
| Guidance behavior tests | 18 passed, isolated temporary repositories |
| Actual production HTTP smoke | Passed |
| Full npm audit after dependency override | Zero vulnerabilities |
| Application CI at `c412ca6` | Passed on Windows, macOS and Linux |
| Guidance CI at `c412ca6` | Passed on Windows and Linux |
| Live routes/assets | Home, three cases, share, favicon, robots and sitemap returned 200; missing page returned 404 |
| External destinations | Public GitHub profile, four project repositories and Megatron product site returned 200 |
| Live search metadata | Canonical/OG origin correct, index/follow enabled, robots allows crawling, sitemap lists four pages |
| Responsive browser checks | No horizontal overflow at 320/390/768/1440 CSS-pixel widths; narrow and wide screenshots inspected |
| Browser interactions | Skip-link focus, mobile menu/Escape/selection, pointer case navigation, hover, demo direct fragments/search/view/reset/dialog, offline guide and guide-link-to-case journey passed |
| Reduced motion | Emulation reported automatic scrolling and zero transition duration |
| Axe 4.14.0 | Zero reported violations after label fixes on rebuilt home, three cases, 404 and tested modal states; settled live homepage rerun also passed |

Mobile Lighthouse 13.6.0 ran in isolated headless Chrome 157.0.8103.78 with default simulated mobile throttling: 412x823, scale 1.75, 150ms RTT, 1638.4Kbps and 4x CPU slowdown.

| Route | Performance | Accessibility | LCP | CLS | Total blocking time |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 96 | 100 | 1.20s | 0 | 217ms |
| Megatron | 92 | 100 | 1.27s | 0 | 353ms |

An earlier home run measured 94 performance and 2.08s LCP. Lab results vary; neither a Lighthouse score nor total blocking time establishes field INP or universal device performance. See [performance review](performance-review.md).

### Verification limits that still matter

- Manual screen-reader review and native browser 200%/400% zoom remain unverified. Simulated zoom keys did not change viewport/device scale; 320px reflow was checked separately.
- Physical touch, real mobile virtual-keyboard behavior and live streaming conversation flows remain unverified.
- Axe leaves incomplete contrast checks around transformed artwork, decorative symbols and some art text. A zero-violation result does not resolve every manual check or certify WCAG conformance.
- Wait for fonts and arrival animations to finish before a settled-state audit. Partial-opacity arrival can temporarily affect contrast results.
- No real Gemini answer, live Redis concurrency/expiry/outage test or field Core Web Vitals measurement has been completed.
- No protected preview AI trial, external social-cache preview or disruptive production rollback was performed.

## 7. Browser tooling and artifacts

Orca's browser CLI worked for actual rendering and interaction checks. In this Windows installation its resolved executable was:

```text
C:\Users\vijay\AppData\Local\Programs\orca\resources\bin\orca.exe
```

Follow the available `orca-cli` and `visual-verify` skills and load version-matched CLI documentation. Discover current runtime/tabs and use fresh page IDs/element references; do not copy old automation handles from chat. Mobile emulation resets on page loads and needs reapplying. Browser availability can change between sessions.

Temporary axe/Lighthouse tools and raw reports were installed/saved only under ignored `.agent-guidance/`. They are not application dependencies or guaranteed fresh-clone artifacts. Orca screenshots live in a temporary directory and expire. The durable results and limitations are in the checked-in review documents.

No temporary app/audit server is intended to remain running. The checkout's guidance watcher is intentionally left running; startup setup verifies/restarts it when necessary. Inspect current processes instead of assuming a prior session's PID is still valid.

## 8. Deployment and recovery

Vercel automatically deploys pushes to `main`. The user established the deployment. No Sites migration, new hosting project, paid upgrade or domain purchase is needed to continue this repo.

- Baseline `c412ca686f713ab1e1c539cf37dac03d4e418409` deployed successfully as Vercel deployment `62SNGiG3XGN6abNPqrKCY9CCNsH9`.
- Browser/performance-reviewed UI revision `32444e14dcd4b89d68849794e6480b82818d03fd` deployed as `8zxu2kWcFGGr5GT7WzhPEk17JZij`.
- Later commits before this handoff patched a development dependency and updated documentation; their local/CI checks passed.
- Vercel status is exposed through GitHub commit statuses. GitHub's deployments list was empty despite the live site. Inspect the actual commit status/dashboard and deployed URL.
- Production defaults to the confirmed Vercel origin in `src/lib/server/site.ts` when `VERCEL_ENV=production`. `SITE_URL` is a validated custom-domain override. Preview and unconfigured local builds stay unindexed; non-Vercel indexing also needs `SITE_INDEXABLE=true`.
- Metadata/robots/sitemap changes require a rebuild/redeployment. A successful local build does not establish a verified deployment.
- Record the current known-good commit/deployment before any future release. Rollback controls have not been exercised here; do not perform a disruptive rollback merely to complete a checklist on the user's live site.

Follow [deployment](deployment.md) and [launch status](launch-status.md). If AI needs shutting down, set both AI flags false in the affected environment, redeploy and verify health/offline POST behavior while ordinary pages remain usable.

## 9. Remaining work and required inputs

### A. Live AI, if the user wants it enabled

Configuration is server-only. `.env.example` contains names, not usable credentials. No credentials or approved daily/monthly budget were supplied in this chat. Do not ask the user to paste secrets into chat or put them in public source/NEXT_PUBLIC variables.

| Variable | Role/current decision |
| --- | --- |
| `AI_ENABLED` | Keep false in production until live release requirements pass |
| `AI_RELEASE_APPROVED` | Keep false in production until live release requirements pass |
| `GEMINI_API_KEY` | Private provider credential required |
| `GEMINI_MODEL` | Explicit supported model ID required; verify current account availability/pricing |
| `UPSTASH_REDIS_REST_URL` | Separate preview Redis REST origin required for private testing |
| `UPSTASH_REDIS_REST_TOKEN` | Private store credential required |
| `AI_DAILY_REQUEST_LIMIT` | User-approved positive request cap required |
| `AI_MONTHLY_REQUEST_LIMIT` | User-approved positive request cap required |
| `AI_SESSION_REQUEST_LIMIT` | Explicit cap required; example currently says 12, not an approved financial budget |

Next steps for this track:

1. Establish the user's intended model, private configuration location and approved caps. Enter secrets in ignored local environment settings or Vercel settings, with preview/production separation.
2. Read [AI policy](ai-policy.md), [evaluation](ai-evaluation.md) and [usage controls](usage-controls.md).
3. Run an authorized protected-preview trial. Both flags must be true in that test environment for the current API gate to permit generation. Production stays disabled during evaluation.
4. Exercise factual/unsupported/adversarial questions, citations, corrections/context, stop/retry/reset, user-clicked actions, quota exhaustion, concurrent reservations, expiry and provider/store failures.
5. Verify actual streaming UI and keyboard/mobile behavior. Record model, date, failures, fixes and observed usage without exposing credentials or retaining visitor conversations unnecessarily.
6. Enable production only after live quality, usage and deployment requirements are satisfied. Request caps are not an exact invoice guarantee.

The health endpoint checks configuration presence/validity; `available=true` alone is not a provider/Redis connectivity or quality test. Missing facts still need an explicit unknown response after live AI is enabled.

### B. Personal content, when supplied by the user

Add approved data to `src/content/portfolio.ts` and connect any new presentation to the existing components. Portrait/resume files belong under `public/` only after the user approves them for publication. Preserve attribution and source-review caveats in projects.

The tests and smoke deliberately assert today's empty experience state. When the user authorizes real experience content, update those expectations to the new requirement while retaining empty-state, validation and fixture-exclusion coverage. Keep synthetic fixtures out of public pages, metadata and AI knowledge.

### C. Manual review and optional performance follow-up

Complete the unverified assistive-technology/real-device checks listed above when suitable tools/devices are available. Megatron's 353ms simulated total blocking time is an optimization opportunity; profile before changing behavior. Recheck measured outcomes after meaningful UI, model or content changes.

## 10. Guidance and commit discipline

`AGENTS.md` and `CLAUDE.md` are editable peers, as are their shared skill folders. The watcher propagates reviewed changes in either direction. Generated context is produced by `Sync-AgentGuidance.ps1`; never edit fingerprints or generated context manually.

After a source change, synchronize, inspect diffs and deliberately stage the matching peers/context with the implementation. The pre-commit hook checks both disk and index and never stages files on your behalf. Resolve real peer conflicts by review, not timestamps. Do not bypass hooks to commit stale guidance.

For each completed ticket/follow-up: run appropriate local checks, verify the actual changed flow, record evidence/limitations, synchronize guidance, inspect staged changes, commit and push to main under the existing authorization. Check CI and the relevant Vercel deployment afterward. Preserve unrelated user edits.

## 11. Suggested first message for the next session

```text
Continue this portfolio from docs/CODEX-HANDOFF.md. First read AGENTS.md,
the generated project context and docs/launch-status.md, then inspect Git
status and recent commits. The portfolio is already deployed at
https://vijayportfolio-eight.vercel.app; preserve the existing Next.js app.

Use the written implementation plan and its execution amendment. Ignore
FDE/other inferred career positioning. I will supply my personal facts,
experience and assets in chat when needed; keep absent sections neutral.

Implement the next requested change, verify it locally and in the actual
running site where relevant, update evidence/guidance, and commit/push to
main after each completed ticket as already authorized. AI remains off
until private provider/store settings, usage limits and live evaluation
are ready. Clearly separate completed checks from unverified items.

My next task is: [describe the change here].
```
