# Deployment preparation

Deployed production: https://vijayportfolio-eight.vercel.app, confirmed over HTTP on 2026-11-15 following the user's deployment. Vercel builds the repository root using Next.js and the committed npm lockfile. vercel.json declares the framework and standard install/build commands. The API exports a 30-second function duration; live AI/account limits still require private configuration and approved budgets. GitHub's Vercel commit status, rather than its empty deployments list, exposes the actual deployment.

## Preview

### Where to add the Gemini key

For local testing, edit .env.local at the repository root (C:\Vijay Sai Chigullapally Portfolio\.env.local) and fill the GEMINI_API_KEY= line with the private key. This ignored file was created during live-AI setup; do not put a key in .env.example, public assets, source code or any NEXT_PUBLIC variable. Restart the local server after configuration changes. Create/manage the key in [Google AI Studio](https://aistudio.google.com/api-keys), following [Google's current key guidance](https://ai.google.dev/gemini-api/docs/api-key).

For a deployed trial, open [the portfolio environment settings](https://vercel.com/vijaysaichigullapally1-9798s-projects/vijay_portfolio/settings/environment-variables), add GEMINI_API_KEY as a Secret and select Preview initially. Configure the other required values below in the same environment. Environment changes require a new deployment; they do not modify an existing deployment. See [Vercel environment variables](https://vercel.com/docs/environment-variables). Production configuration follows only after the trial passes.

| Setting | Required value |
| --- | --- |
| GEMINI_API_KEY | Private Gemini key; never paste it into chat. |
| GEMINI_MODEL | gemini-3.5-flash-lite; owner-key generation and the versioned quality review passed on 2026-11-15. Recheck account availability/pricing before a future model change. |
| UPSTASH_REDIS_REST_URL | HTTPS REST origin for the isolated preview database. |
| UPSTASH_REDIS_REST_TOKEN | Private write-capable REST token; store as a Secret. |
| AI_DAILY_REQUEST_LIMIT | Owner-approved positive daily request cap. |
| AI_MONTHLY_REQUEST_LIMIT | Owner-approved positive monthly request cap. |
| AI_SESSION_REQUEST_LIMIT | Owner-approved positive per-session request cap. The example's 12 is not an approved budget. |
| AI_ENABLED / AI_RELEASE_APPROVED | Production has both true after the approved trial and release checks. Defaults and new Preview deployments remain false. For a future trial, enable only its isolated protected environment. |

Local .env.local includes the private key, planned model, temporary scratch Redis and approved public caps, with both flags false by default. The owned trial server overrides flags/caps only in its process. The scratch database expires on 2026-11-18; it is used only for isolated tests/Preview. The owner created a separate permanent Redis database and saved its REST credentials under ignored .agent-guidance/production.env; these were transferred directly through authenticated CLI stdin to Vercel Production. Preview and Production keys/tokens are stored as Secrets. Production was configured with both flags false until deployed checks complete. The owner approved public caps of 25/day, 250/month and 6/session, a $5 monthly target and up to $1 for testing. Key presence or available=true does not establish connectivity or readiness.

Import the existing repository into the intended Vercel account/project when that connection is available. Keep AI_ENABLED=false and AI_RELEASE_APPROVED=false initially. Configure a separate preview Redis database before any live AI trial; never reuse production quota keys. Supply secrets through Vercel environment settings, not chat, source files or NEXT_PUBLIC variables. Environment names are in .env.example. Build with Node 22, then deploy the exact reviewed commit as a preview. VERCEL_ENV=preview keeps indexing disabled. Choose preview access/protection deliberately in the actual account.

Verify the actual preview: homepage, every case route, 404, icon/share PNG, local fonts, links, mobile navigation, keyboard/dialog behavior, demo search/reset/expand/direct fragments and offline guide. Then, with approved budget/key/model/store and access protection, perform the real provider, quota, source/action and outage scenarios in ai-evaluation.md and usage-controls.md. Record URL, commit and results. A passing local build is not deployment verification.

## Production gate

Production is deployed with neutral personal content and AI enabled after the approved live guide/store evaluation, protected browser trial and isolated disable drill. Reviewed source 46ac373eaff287586bdddc2dbc4928e9d27a8b2a was redeployed as dpl_FpYVFwXad9a6xzLoFGGDSqkqAxzB with the permanent production Redis, Gemini key/model and caps of 25/day, 250/month and 6/session. Public HTTP and actual browser generation/source/action checks passed. See launch-status.md for the current recovery record and deferred personal/manual inputs.

The preceding setup instructions describe the safe sequence for a new environment; they do not mean the present production release is still disabled. Its earlier configuration stayed off until the trial completed. New Preview configuration is off after evaluation. The scratch store expires on 2026-11-18 and must never replace the separate permanent production store.

Vercel production defaults to the confirmed HTTPS origin above. Set SITE_URL before building when adopting a custom domain; other hosts also require SITE_INDEXABLE=true. Preview builds remain unindexed. Confirm the deployed commit, links, all routes, canonical metadata/robots/sitemap, asset loading and guide state at the intended domain.

## Disable and rollback

To disable generation, set AI_ENABLED=false and AI_RELEASE_APPROVED=false in the relevant Vercel environment and redeploy. The ordinary portfolio remains available. Confirm /api/chat reports available=false and valid POST returns 503. Do not put a secret into a health request.

Before promotion, record the previous known-good deployment ID/URL and commit. The initial deployed revision was 198775e7120cbe7c9bf9c370eb5cc1bec6be4df8, Vercel deployment 5txVuThtv4segabaw6sADi6Q18P5 in project vijay_portfolio. Its home and three case pages returned 200. Use Vercel's rollback/promote controls when needed; no disruptive rollback has been exercised on the user's live site. Keep preview and production budgets/storage separate. Review provider/Redis operational dashboards without logging conversation bodies.

## Local and CI evidence

All application checks and production HTTP smoke run locally before commits. Application CI runs the same gate on Windows/macOS/Linux as an additional platform check. Existing guidance CI checks Windows/Linux. A historical Windows guidance run exposed a shared-file observer failure; its fixture reader now permits atomic replacement and retries only transient sharing/lock violations, with a deterministic failing-then-passing regression. No CI result is treated as proof of browser rendering or live services.
