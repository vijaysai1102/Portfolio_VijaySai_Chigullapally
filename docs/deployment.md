# Deployment preparation

Deployed production: https://vijayportfolio-eight.vercel.app, confirmed over HTTP on 2026-11-15 following the user's deployment. Vercel builds the repository root using Next.js and the committed npm lockfile. vercel.json declares the framework and standard install/build commands. The API exports a 30-second function duration; live AI/account limits still require private configuration and approved budgets. GitHub's Vercel commit status, rather than its empty deployments list, exposes the actual deployment.

## Preview

Import the existing repository into the intended Vercel account/project when that connection is available. Keep AI_ENABLED=false and AI_RELEASE_APPROVED=false initially. Configure a separate preview Redis database before any live AI trial; never reuse production quota keys. Supply secrets through Vercel environment settings, not chat, source files or NEXT_PUBLIC variables. Environment names are in .env.example. Build with Node 22, then deploy the exact reviewed commit as a preview. VERCEL_ENV=preview keeps indexing disabled. Choose preview access/protection deliberately in the actual account.

Verify the actual preview: homepage, every case route, 404, icon/share PNG, local fonts, links, mobile navigation, keyboard/dialog behavior, demo search/reset/expand/direct fragments and offline guide. Then, with approved budget/key/model/store and access protection, perform the real provider, quota, source/action and outage scenarios in ai-evaluation.md and usage-controls.md. Record URL, commit and results. A passing local build is not deployment verification.

## Production gate

Production is deployed with neutral personal content and AI disabled. Final content, browser/accessibility/performance review and live guide/store evaluation remain separate acceptance items; see launch-status.md for current evidence and required inputs.

Vercel production defaults to the confirmed HTTPS origin above. Set SITE_URL before building when adopting a custom domain; other hosts also require SITE_INDEXABLE=true. Preview builds remain unindexed. Confirm the deployed commit, links, all routes, canonical metadata/robots/sitemap, asset loading and guide state at the intended domain.

## Disable and rollback

To disable generation, set AI_ENABLED=false and AI_RELEASE_APPROVED=false in the relevant Vercel environment and redeploy. The ordinary portfolio remains available. Confirm /api/chat reports available=false and valid POST returns 503. Do not put a secret into a health request.

Before promotion, record the previous known-good deployment ID/URL and commit. The initial deployed revision was 198775e7120cbe7c9bf9c370eb5cc1bec6be4df8, Vercel deployment 5txVuThtv4segabaw6sADi6Q18P5 in project vijay_portfolio. Its home and three case pages returned 200. Use Vercel's rollback/promote controls when needed; no disruptive rollback has been exercised on the user's live site. Keep preview and production budgets/storage separate. Review provider/Redis operational dashboards without logging conversation bodies.

## Local and CI evidence

All application checks and production HTTP smoke run locally before commits. Application CI runs the same gate on Windows/macOS/Linux as an additional platform check. Existing guidance CI checks Windows/Linux. A historical Windows guidance run exposed a shared-file observer failure; its fixture reader now permits atomic replacement and retries only transient sharing/lock violations, with a deterministic failing-then-passing regression. No CI result is treated as proof of browser rendering or live services.
