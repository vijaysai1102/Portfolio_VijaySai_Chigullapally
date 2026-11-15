# Maintaining the portfolio

## Run and verify

Use Node 22 (local verification used 22.23.2) and the committed npm lockfile. On Windows, run from this checkout in PowerShell:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Setup-AgentGuidance.ps1
npm.cmd ci
npm.cmd run dev
```

Open http://127.0.0.1:3000. Stop that owned development process before production testing if needed. `npm.cmd run check` runs lint, type checks, application tests and build; `npm.cmd run smoke` starts its own production server on 3100, checks actual routes/API/semantics/fonts/share, then stops it. It forces AI off to avoid paid calls from local configuration. The smoke's ignored artifact directory is created automatically on a fresh clone.

```powershell
npm.cmd run check
npm.cmd run smoke
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Test-AgentGuidance.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ./scripts/Sync-AgentGuidance.ps1 -Check
```

Windows PowerShell source reads/writes must explicitly use UTF-8. Do not change global NVM selection or execution policy as a repair. The root guidance explains approvals and two-way synchronization. Run actual browser journeys using accessibility-review.md and visual-verify; HTTP checks do not replace them. Inspect .agent-guidance/share-preview.png when changing share artwork. CI repeats application verification on Windows/macOS/Linux and guidance verification on Windows/Linux.

## Content and personal details

`src/content/portfolio.ts` is the editable public record. `src/content/model.ts` validates projects and HTTPS destinations. Internal provenance is in content-evidence.md; it is not imported into public knowledge. Read the chat-supplied facts before editing. There is no CMS, account system or backend content editor.

- Experience: add only approved entries to profile.experience with organization, title, description and optional period/URL. The renderer is in components/experience.tsx. Update the initial-empty expectations in tests/portfolio.test.ts and scripts/Smoke-Portfolio.mjs when the approved requirement changes; retain fixture exclusion and empty-state coverage.
- Education/certifications: add approved titles to profile.education/profile.certifications; issuer/date/URL are optional. Do not infer them from earlier plan text. Components/credentials.tsx wraps long titles and omits absent metadata.
- Portrait: add the supplied public image under public/, then set profile.portrait to its relative src and approved alt. Hero reserves dimensions and uses next/image. Recheck crop, mobile fit, slow loading, focus and motion. Do not use the permanently rejected mockup or an invented replacement photograph.
- Resume/email: place the approved public PDF under public/ and set profile.resume to its path, or supply a validated HTTPS destination. Set profile.email only when approved for publication. Contact helpers reject unsafe paths and mail header parameters. Verify the actual document before exposing its link; no resume exists now.
- Biography: the current introduction/approach is deliberately generic. Add approved wording to structured profile data and connect the hero/About presentation when supplied; update knowledge from that same approved data. Do not insert an unsupported job title into metadata.

After a content edit, run the full checks/smoke, inspect rendered narrow/wide pages, review sources and metadata, then use the repository's ordinary commit/push workflow. As a representative safe content-edit verification, the existing tests parse a temporary project value, reject unsafe inputs/private fields and render synthetic personal entries without adding them to production. Do not copy those fixtures into public records.

## Projects, knowledge and guide actions

Project sections feed both the shared route template in app/projects/[slug]/page.tsx and the evidence collection in lib/knowledge.ts. Keep claims linked to actual source artifacts, scope metrics and distinguish source review from a runtime reproduction. Update review dates after actual evidence review. Public sources are derived in portfolio.ts; citation destinations are canonicalized independently of model URLs.

For a new project, add its stable ID/content/source, intentional art in components/project-art.tsx, topic aliases in lib/knowledge.ts and lib/conversation.ts, and allowed current-project IDs in lib/chat-contract.ts. Optional website is validated as HTTPS by parseProject and rendered on the case page; preserve existing product-link labels/destinations. Guide pathname context, quick links, fallback project list, static case routes, sitemap and source/action registries derive from project data. Add its production route to the smoke check and verify contextual follow-ups and explicit navigation. Inspect the additional-work selection instead of publishing every repository or claiming ownership from repository presence.

The sample explorer is an independent illustration with fictional data, not the Megatron desktop app. Its contract, URL fragments, reset/search/modal behavior and fallback are in demo-integration.md. Recheck that contract when upstream Megatron changes; do not assume the promotional host exposes a message bridge. No postMessage integration is trusted here.

The guide's bounded history is memory-only; reload/reset discards conversation. Source/body limits and allowed views/actions are explicit. App code does not log message bodies. Provider tools are not reconstructed: suggestions are validated plain-text IDs that require a visitor click. See ai-policy.md and ai-evaluation.md before changing retrieval, model or action behavior.

## Provider and storage configuration

Copy .env.example to ignored .env.local only for new local configuration; preserve the owner's existing private settings. Never paste an API key into chat, public assets, source, build arguments or NEXT_PUBLIC variables. Production now uses the owner's key, gemini-3.5-flash-lite and permanent Redis under the approved 25/day, 250/month and 6/session caps. Recheck account availability/pricing before changing models; no model is guessed by the app.

Keep both AI flags false by default. To run an authorized private trial, first configure a separate preview Redis database, an explicitly approved daily/monthly/session request budget and the provider key/model; review provider account billing/retention. Enable flags only in that protected test environment for the trial. Production flags remain false until live quality, usage and deployed browser checks pass. Tests with controlled responses are insufficient for that approval.

usage-controls.md explains atomic reservation, TTLs, UTC buckets, conservative failure charging and cost-containment limitations. Run actual concurrency/expiry/outage tests against a separate preview store. Set the chosen limits after financial approval; request caps do not guarantee an exact invoice. Review operational counters/provider billing without retaining conversations indefinitely.

## Deployment, shutdown and recovery

Follow deployment.md and launch-status.md. Production is live at https://vijayportfolio-eight.vercel.app, linked to main through Vercel project vijay_portfolio. A verified deployment/commit recovery record is in launch-status.md. Review the exact preview commit, store and environment boundaries before any live AI trial or promotion. Vercel production defaults to this confirmed origin; set SITE_URL for a custom domain and rebuild. Preview builds remain unindexed.

To shut off generation, set AI_ENABLED=false and AI_RELEASE_APPROVED=false in the affected environment and redeploy. Verify available=false and offline POST behavior; ordinary links/pages should stay usable. This disable behavior passed an isolated deployed Preview drill on 2026-11-15. Record the previous known-good deployment ID/URL and commit before production promotion. A disruptive production rollback has not been exercised; use the actual Vercel controls only when recovery is needed.

Known limitations and per-ticket evidence are in ticket-records.md, accessibility-review.md, performance-review.md, ai-evaluation.md and launch-status.md. Responsive/keyboard browser checks, mobile lab performance, live provider/store quality and the isolated cloud shutdown drill have recorded evidence. Manual assistive-technology and physical-device review remain unverified; preserve the user's deferred personal-content decisions.
