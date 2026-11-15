# Launch status

Production, including the live AI guide, is available at https://vijayportfolio-eight.vercel.app. The interrupted release was completed on 2026-11-15 from reviewed source 46ac373eaff287586bdddc2dbc4928e9d27a8b2a. This supersedes historical offline-AI, unavailable-browser and unconnected-deployment entries in ticket-records.md.

## Verified release

- Home, Megatron, WeatherScope and F1 routes return 200; missing routes return 404. Local fonts, favicon and sharing PNG work. Canonical/OG URLs, index/follow, robots and the four-entry sitemap use the confirmed origin.
- The studio, neutral monogram, project cards, cases and sample explorer are implemented. Experience, education, credentials, portrait, resume and email remain empty or omitted as authorized; personal facts and contributions await the user's later edits. GitHub is the working contact destination.
- Orca Chromium checks covered 320/390/768/1440 CSS-pixel widths, inspected screenshots, skip-link focus, mobile menu/Escape/selection, pointer project navigation, hover, demo fragments/search/reset/modal and the offline guide. No horizontal overflow or captured application console errors were found. Axe 4.14.0 reported zero violations on the rebuilt home, three cases and 404 after accessible-name fixes; manual-review items remain documented.
- Mobile Lighthouse 13.6.0 on the deployed revision scored 96 performance/100 accessibility for home and 92/100 for Megatron. LCP was 1.20s/1.27s and CLS was zero. These are simulated lab runs, not field Core Web Vitals or a standards certification. See performance-review.md.
- Fresh Windows Node 22.23.2 lint, types, all 26 application tests, build, production HTTP smoke and guidance consistency passed at the release source. HTTP smoke required execution outside the restricted network sandbox after Next reported ready but loopback requests timed out inside it. Application CI passed on Windows/macOS/Linux; guidance CI passed on Windows/Linux. The earlier 18 guidance regressions and actual next dev guidance-hash check remain recorded evidence; synchronization code did not change in this release.
- Live quality review passed 32/32 cases after fixes and targeted reruns, with 11 independent critical repeats. Real Redis concurrency/expiry/rollover/failure checks passed. Protected cloud preview exercised generation, sources, sample/project navigation, stop/retry/reset and session exhaustion. A separate deployed disable-switch drill returned offline/503 while its homepage remained available; production traffic was not interrupted.
- Public production health returns available=true. An actual browser question generated source-supported fictional Skills content, linked to the Megatron case, and suggested /projects/megatron#demo-skills. Selecting it opened that route, selected Skills and closed the guide. Inspected the answer at 880px desktop and 390x844 mobile emulation; no horizontal overflow or captured console errors. Escape restored launcher focus. The UI reported five remaining questions after one request, consistent with the six-question session cap. Private credentials matched no client/static output.

## Remaining inputs and manual checks

| Item | State |
| --- | --- |
| Personal content/assets | Intentionally deferred to the user's facts; nothing inferred from FDE or other role positioning |
| Public AI | Released with gemini-3.5-flash-lite, permanent production Redis and approved caps of 25/day, 250/month and 6/session; $5 monthly target and up to $1 for testing. Request limits are not an exact invoice guarantee |
| Assistive technology | Native 200%/400% browser zoom, manual screen-reader review and real mobile virtual-keyboard/live-chat checks remain unverified; 320px reflow and keyboard paths were checked |
| Automated accessibility | Zero reported violations in tested settled states; transformed artwork/decorative symbols leave axe manual contrast-review items. No WCAG conformance claim |
| Preview/operations | Protected preview and deployed disable-switch drill passed. New Preview deployments have both AI flags false; the isolated scratch database expires on 2026-11-18. External social-service cache preview and a disruptive production rollback remain unperformed |

## Recovery record

Verified live-AI source: 46ac373eaff287586bdddc2dbc4928e9d27a8b2a, Vercel deployment dpl_FpYVFwXad9a6xzLoFGGDSqkqAxzB, project vijay_portfolio. Previous production deployment dpl_84ZDQM7SyDSqzBtV2Jjmgkzrk3jx served the same source with AI off. Protected trial: dpl_2XYXegP7CLSM67XgypMu3PPNAtNQ; disable drill: dpl_7iD71o9U27pRTmcXHcxqA55sGuJ3. Detailed synthetic records stay under ignored .agent-guidance/. Documentation-only follow-up commits may create later deployments of unchanged application code; inspect their actual status before treating them as verified.

To disable generation, set both Production AI flags false, redeploy and verify available=false plus valid POST=503 while ordinary pages work. The disable behavior was exercised on an isolated cloud deployment, not by rolling back the public site. Keep preview/production secrets and storage separate. No paid plan, domain purchase or announcement was made.
