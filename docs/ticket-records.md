# Ticket evidence

## T07 — Done (browser render unavailable)
Added Next.js/React/TypeScript/npm scaffold, lockfile, ESLint, security headers, server-only env example, production HTTP smoke, README and manual guidance. Verified Node 22.23.2 clean `npm ci`, lint, typecheck, test, production build and production homepage HTTP response. Corrected Windows test-glob resolution by using explicit test entry. Real pre-commit exposed NLS/ICU source ordering differences between PowerShell engines: added a failing isolated cross-engine regression, then fixed with an explicitly typed ordinal sort in Sync-AgentGuidance.ps1. Test-AgentGuidance.ps1 now runs 16 behavior checks including both actual Windows engines. Browser host unavailable, so rendered page not observed. Production npm audit: zero; seven moderate dev-only minimatch/typescript-eslint advisories remain after compatible audit fix; Next plugins require deprecated ESLint 9. No forced major upgrades. Durable storage decision: atomic Redis REST limits, fail closed; no cloud resources created. Credentials and real-model smoke remain future dependencies.

## T06 — In review: visual verification unavailable
File: mobile-composition.md and responsive concept from T05. Specified 360/390/tablet, menu/chat/demo behavior, dynamic viewport and reduced motion. Static review only: CUA browser unavailable. Actual rendered QA pending. Palette verified in T05.

## T05 — In review: visual verification unavailable
File: homepage-concept.html. Desktop composition includes hero, neutral monogram, flagship sample surface, two supporting projects, about/contact, open-chat and selected-project states. Local preview attempted; HTTP probe timed out across executor boundaries. Browser host returned unavailable, so rendered review and screenshot inspection could not be performed; owner deferred design review. Palette contrast checks passed (5.29:1 minimum normal-text pair). Do not infer visual acceptance from static checks. Implementation can proceed under chat authorization; final visual review remains required.

## T04 — Done
File: design-direction.md with inline vector board. Defined tokens, typography, centerpiece, portrait slot, interactions and reduced-motion fallback. No existing app interactions. Visual review by owner deferred per chat. Palette verified before implementation.

## T03 — Done
File: content-map.md. Stable route/section/source IDs, direct project journeys, optional AI and omitted empty personal sections specified. Reviewed ordinary links and no-AI visitor journeys. Guidance/whitespace checks passed.

## T01 — Done
Files: portfolio-brief.md; original backlog captured. Checked conversation precedence, release scope, unknown personal details, ordinary navigation and optional AI. Guidance/whitespace checks and commit hooks passed. No app tests applicable.

## T02 — Done
Reviewed all 36 identifiers and dependency ordering: dependencies refer only to earlier tickets. Added execution amendment; original detailed acceptance and verification remain intact. Public AI stays gated on T28/T29. Chat authorizes continuous implementation and push after each verified ticket. Personal claims deferred. Record partial and blocked portions explicitly. Verification: numbering/dependency review and guidance check.

## T08 — Done
Added typed profile/project/experience/credential models, boundary validation, public field projection, stable IDs and separate evidence notes. Empty personal collections remain empty. Observed validation and private-note leakage tests fail before implementation, then pass. Full lint/typecheck/tests/build and production HTTP smoke passed. No UI change.

## T09 — Implementation verified; rendered review pending
Added global tokens, responsive spacing/type, semantic links, tags and labels; visible focus, native touch targets and reduced-motion styles. Initial scaffold has no animation/pointer behavior to preserve. Existing homepage identity and GitHub path preserved. Full lint/types/tests/build/production HTTP passed. Browser host unavailable: narrow/wide visual, focus and contrast-in-browser review pending. Palette normal text contrast verified in T05; external fonts have system fallbacks.

## T10 — Implementation verified; interactive browser review pending
Header, navigation, menu Escape/focus-return behavior, footer, skip link, sticky anchor offsets and intentional 404. Native links and back behavior retained; primitive hover/focus/reduced-motion rules preserved. Production HTTP smoke now validates every homepage anchor and a real 404 destination; full checks passed. Browser unavailable, so menu activation, back/forward, narrow rendering and actual focus traversal remain unverified.

## T11 — Partial: real portrait and final personal copy pending
Added responsive editorial hero, reserved portrait integration and original static engineering orbit graphic; no substitute photo or rejected asset. Existing anchors, link hover/focus, header/menu and reduced-motion behavior preserved. Full checks and production HTTP passed. Portrait and approved personal wording absent, so final asset-dependent acceptance remains pending. Browser host unavailable: narrow/wide/touch/slow-image render review not performed.

## T12 — Implementation verified; browser review pending
Added flagship Megatron and two supporting project cards from validated records. Source destinations remain active until each case study has sections. Original code-native artwork is explicitly illustrative/sample data, with no claimed project metrics. Entire cards are normal links; text and tags remain visible on touch. Existing hero/menu/anchors/focus preserved; new arrow/border hover transitions opt out under reduced motion. Full checks/build/HTTP passed; actual pointer/keyboard/mobile rendering unavailable.

## T13 — Partial: contribution details and rendered review pending
Added reusable static case-study route, contents navigation, source/evidence note, related destinations and Megatron technical narrative. Reviewed README and scanner docs; costs/cached update limits distinguished. No personal ownership, testimonials or adoption claims published. Full checks and real homepage/404/Megatron HTTP journeys passed. Desktop application not run; browser render/interaction unavailable. Personal contribution and early-feedback wording await chat.

## T14 — Partial: interactive browser verification pending
Inspected existing site headers/HTML and documented reuse limits in demo-integration.md. Added independent labeled sample explorer with allowed views, search/empty/reset, native expand/close dialog and external product fallback. View guard test failed before implementation and passes after; full checks and production routes passed. No remote bridge, file access or real telemetry. Existing case links and focus styles preserved; native dialog behavior is not claimed verified without browser access.

## T15 — Partial: personal contribution and browser review pending
Authored WeatherScope case study from reviewed forecasting code and saved REPORT.md. Temperature and weak/negative precipitation results retain target, metric, 90-day one-step holdout, aggregate scope and source-report status; no retraining claimed. Added direct artifact link and production HTTP route check. Full app checks passed. Conceptual artwork is labeled, not an exported result plot. Personal contribution and visual QA remain pending.

## T16 — Partial: approved answer example, contribution and browser review pending
Case study traced to ingestion.py/rag_agent.py and README. Correctly describes local PDF ingestion, MiniLM/Chroma retrieval, citation prompting and separate web enrichment; explicitly avoids regulatory correctness guarantees. Source review is not a live answer test. Full checks and all three case-study HTTP routes passed. No supplied/recorded regulation example or personal contribution claim was invented. Browser review unavailable.

## T17 — Implementation verified; contribution/visual review pending
Added PingBack as a reviewed additional source-linked project. README/repository metadata reviewed; no sole-authorship or runtime notification claim. Reuses validated records and ordinary links; no unnecessary filters. Existing flagship prominence, card hover/focus, menu and motion rules preserved. Full checks and all production routes passed. Browser unavailable; personal attribution wording awaits chat.

## T18 — Implementation verified; responsive fixture review pending
Experience layout connected to the empty production collection. Synthetic populated fixture exists only in tests; its initial missing-render assertion failed before implementation and passes after. Production HTTP asserts no fixture or empty experience section leaks. Added modular About section and preserved all existing anchors/hover/focus/menu/demo behavior. Full checks and routes passed. Browser narrow/wide fixture review unavailable; no employment facts inserted.

## T19 — Partial: supplied personal facts pending
Reusable education/certification renderer supports title-only and optional issuer/date/valid HTTPS link without invented badges or metadata. Empty collections omitted. Populated fixture render failed before implementation and passes after; full checks and production routes passed. In accordance with chat, earlier personal facts are not published until supplied here. Real content and narrow/wide browser review pending.

## T20 — Partial: supplied resume/email pending
Added modular contact area with supplied GitHub profile; email/resume controls appear only when configured. Boundary test failed on mail-header injection before validation and passes after. Production HTTP regression caught UTF-8 punctuation corrupted by legacy PowerShell default reading; rewrote page explicitly in UTF-8 and kept a failing-then-passing HTTP guard. No fake download or invented email; no message sent. Full checks and all production routes passed. Resume asset, preferred contact data and browser/download review remain pending. Existing navigation/card/demo/focus behavior preserved.

## T21 — Implementation verified; personal corpus approval pending
Knowledge derives from validated project records, stable IDs, canonical routes and reviewed-at date. Deterministic aliases select weather, retrieval and tooling evidence; current-project fallback supports follow-ups. Missing personal facts explicitly excluded. Selection assertion failed before implementation, passes after; full checks/HTTP passed. ai-policy.md documents memory-only chat, provider disclosure, no message logging and release gates. No secrets/private notes/empty experience enter the corpus.

## T22 — Partial: real provider credentials/model verification pending
Added bounded same-origin JSON input, privileged-role rejection, provider adapter/SSE parser, cancellation, 20-second timeout, explicit quota/provider errors and output caps. Zero retries avoids duplicate paid calls. Key uses server header, never URL/client. Request/stream tests failed before implementation and passed after. Production smoke exposed Next internal-host normalization; same-origin validation now compares browser Origin authority with Host, covered by regression and actual 400/403/offline-503 checks. Full checks and pages passed. Smoke server forces AI flags off to avoid paid calls from future local configuration. Official REST/pricing docs rechecked; model remains explicit env configuration. No key/account/model quota supplied, so no live generation or cancellation smoke claimed. Both release flags default off.

## T23 — Partial: real-model grounding evaluation pending
Connected evidence selection/system policy to generation. Unknown facts return an explicit lookup limitation without a paid model call; cited links resolve only registered IDs from selected evidence. Missing valid citations causes an error event instead of accepting a completed answer. Grounding test failed first and passes after; full checks/API/page HTTP passed. Visitor/repository text treated as data and no secrets included. This does not prove model factuality or injection resistance: real factual/ambiguous/adversarial evaluation remains gated by missing credentials.

## T24 — Partial: live multi-turn/cancellation review pending
Pure conversation preparation bounds history, clips older assistant context, preserves newest user intent and prioritizes explicit correction/current page/prior topic. Server requests remain independent with no shared conversation store. Context test failed before implementation and passes after; full checks plus all page/API HTTP passed. Personal facts still come only from approved corpus. Live-model follow-ups and browser reset/cancel/session journeys remain unverified without credentials/browser host.

## T25 — Partial: browser and real-stream journeys pending
Added native dialog/launcher, memory-only conversation hook, source links, suggested prompts, send/stop/retry/reset/close, privacy disclosure, status/error/offline states and ordinary project links. Generation IDs and AbortController prevent stale updates after stop/reset; incomplete or uncited failed responses are removed. Fragmented UTF-8/source-canonicalization test failed before implementation then passed. Full checks and real offline API/page/launcher HTTP passed. Existing menu/demo/native-focus/anchor rules preserved. Browser host unavailable: focus trapping/return, mobile keyboard, streaming UI and clicks not exercised. No credentials, so no live chat claim.

## T26 — Partial: real-model/browser guided journey pending
Allowlisted project/open/highlight/section/source suggestions resolve to canonical links at server and client; unknown IDs/URLs discarded, duplicates removed and capped at two. Optional visitor click applies navigation; no autonomous external action or invented provider tool protocol. Action test failed before implementation then passed; full checks and production routes passed. Fragment highlights use existing project IDs and preserve hover/focus/reduced motion. Actual guided clicks/back/forward and model action quality remain unverified.

## T27 — Partial: real guided browser journey pending
Added allowlisted demo fragments, native same-page navigation, URL-backed view subscription, view-scoped search and reset. Guide request validates current sample view only for Megatron; model context labels sample items fictional. Fragment test failed first then passed; full checks/all production routes passed. No remote bridge, arbitrary commands or actual plugin operations. Native dialog and ordinary controls preserved. Actual ask/open-view/reset/focus/back journey and live model selection unavailable without browser/key.

## T28 — Partial: real Redis concurrency and budget approval pending
Implemented atomic EVAL reservation across global UTC day/month and expiring anonymous session counters, before provider calls. No process-local fallback. Missing configuration/outage/quota prevents generation; HttpOnly/SameSite/Secure cookie and UI allowance/reset semantics added. Adapter refusal/outage test failed first, then passed; full checks and real offline API/page HTTP passed. Daily/monthly caps left blank and release flags false because budget not approved. Official Redis/Upstash contracts reviewed. Tests use controlled HTTP responses, not actual Lua/Redis: multi-instance concurrency, expiry/outage recovery and live cost configuration remain unverified.

## T29 — Partial: live quality/release evaluation blocked by configuration
Expanded deterministic provider framing/safety, quota configuration/result, payload size/format, identity and career-paraphrase coverage. Quality regression failed on known identity before fixes; added supplied name/GitHub evidence and stricter unknown-career handling with canonical public source resolution. Full checks and production page/API smoke passed. ai-evaluation.md separates tested contracts from required live factual/adversarial/action/cancellation/store scenarios. No key/store/budget/browser means actual model quality and public release acceptance are not established; release flag remains false.

## T30 — Partial: rendered polish review pending
Inventoried and preserved card arrow/border hovers, static orbit, sticky/menu/Escape/focus, native demo modal/search/reset/URL state, guide controls and ordinary anchors. Added brief CSS arrival with existing reduced-motion important override; larger privacy text, 44px mobile controls, non-zooming mobile demo input and clearer source-scope copy. Removed internal future-content notes from public case text without inventing contributions. Full checks and all production HTTP passed. Browser unavailable: no rendered polish/hover/touch/reduced-motion observation claimed.

## T31 — Partial: public origin and deployed sharing verification pending
Added page-specific metadata, original favicon, static 1200x630 share PNG and robots/sitemap with explicit-origin and preview indexing gates. Origin/indexing regression failed before implementation then passed; full lint/types/22 tests/build passed. Actual PNG/robots/sitemap/page/API HTTP passed after correcting case-sensitive robots test assumption. Saved and visually inspected share-preview.png: text fits without clipping. No guessed domain, role or personal claim. Final canonical origin/social-cache behavior needs deployment; website browser review unavailable.
