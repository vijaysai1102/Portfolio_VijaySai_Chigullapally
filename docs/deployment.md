# Deployment preparation

Target: Vercel, using the repository root, Next.js and the committed npm lockfile. vercel.json declares the framework and standard install/build commands. The API exports a 30-second function duration; actual account/runtime limits must be checked on the deployed preview. No cloud project, paid plan, domain or production promotion has been created by local implementation.

## Preview

Import the existing repository into the intended Vercel account/project when that connection is available. Keep AI_ENABLED=false and AI_RELEASE_APPROVED=false initially. Configure a separate preview Redis database before any live AI trial; never reuse production quota keys. Supply secrets through Vercel environment settings, not chat, source files or NEXT_PUBLIC variables. Environment names are in .env.example. Build with Node 22, then deploy the exact reviewed commit as a preview. VERCEL_ENV=preview keeps indexing disabled. Choose preview access/protection deliberately in the actual account.

Verify the actual preview: homepage, every case route, 404, icon/share PNG, local fonts, links, mobile navigation, keyboard/dialog behavior, demo search/reset/expand/direct fragments and offline guide. Then, with approved budget/key/model/store and access protection, perform the real provider, quota, source/action and outage scenarios in ai-evaluation.md and usage-controls.md. Record URL, commit and results. A passing local build is not deployment verification.

## Production gate

Production remains pending: supplied personal facts, portrait and resume/contact decisions; approved project contributions/examples; browser/accessibility/performance review; actual preview results; account/domain/canonical origin; live guide/store evaluation if AI is enabled. A static-first launch with AI disabled is possible only after the remaining content and site review are accepted. This document does not silently waive those gates.

Configure SITE_URL to the final HTTPS origin before building. Vercel production enables indexing only with that origin; other hosts also require SITE_INDEXABLE=true. Deploy/publish the reviewed revision rather than a moving branch result. Confirm deployed links, all routes, canonical metadata/robots/sitemap, asset loading and guide state at the intended domain.

## Disable and rollback

To disable generation, set AI_ENABLED=false and AI_RELEASE_APPROVED=false in the relevant Vercel environment and redeploy. The ordinary portfolio remains available. Confirm /api/chat reports available=false and valid POST returns 503. Do not put a secret into a health request.

Before promotion, record the previous known-good deployment ID/URL and commit. Use Vercel's actual rollback/promote controls for that deployment when needed; the account must be connected to verify the precise controls. No rollback has been exercised because no deployment exists yet. Keep preview and production budgets/storage separate. Review provider/Redis operational dashboards without logging conversation bodies.

## Local and CI evidence

All application checks and production HTTP smoke run locally before commits. Application CI runs the same gate on Windows/macOS/Linux as an additional platform check. Existing guidance CI checks Windows/Linux. A historical Windows guidance run exposed a shared-file observer failure; its fixture reader now permits atomic replacement and retries only transient sharing/lock violations, with a deterministic failing-then-passing regression. No CI result is treated as proof of browser rendering or live services.
