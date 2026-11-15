# Launch status

Production is live at https://vijayportfolio-eight.vercel.app. The user completed the Vercel deployment; follow-up checks and fixes were performed on 2026-11-15. This supersedes historical unavailable-browser and unconnected-deployment entries in ticket-records.md.

## Verified release

- Home, Megatron, WeatherScope and F1 routes return 200; missing routes return 404. Local fonts, favicon and sharing PNG work. Canonical/OG URLs, index/follow, robots and the four-entry sitemap use the confirmed origin.
- The studio, neutral monogram, project cards, cases and sample explorer are implemented. Experience, education, credentials, portrait, resume and email remain empty or omitted as authorized; personal facts and contributions await the user's later edits. GitHub is the working contact destination.
- Orca Chromium checks covered 320/390/768/1440 CSS-pixel widths, inspected screenshots, skip-link focus, mobile menu/Escape/selection, pointer project navigation, hover, demo fragments/search/reset/modal and the offline guide. No horizontal overflow or captured application console errors were found. Axe 4.14.0 reported zero violations on the rebuilt home, three cases and 404 after accessible-name fixes; manual-review items remain documented.
- Mobile Lighthouse 13.6.0 on the deployed revision scored 96 performance/100 accessibility for home and 92/100 for Megatron. LCP was 1.20s/1.27s and CLS was zero. These are simulated lab runs, not field Core Web Vitals or a standards certification. See performance-review.md.
- Local Windows Node 22.23.2 checks cover lint, types, 22 application tests, build, production HTTP smoke and 18 guidance regressions. CI additionally passed on Windows/macOS/Linux (application) and Windows/Linux (guidance). Actual next dev startup preserved both guidance hashes after the development-output fix.

## Remaining inputs and manual checks

| Item | State |
| --- | --- |
| Personal content/assets | Intentionally deferred to the user's facts; nothing inferred from FDE or other role positioning |
| Public AI | Offline. Requires a private Gemini key/model, preview Redis REST configuration, approved daily/monthly/session caps and real provider/quota/quality evaluation before enabling both release flags |
| Assistive technology | Native 200%/400% browser zoom, manual screen-reader review and real mobile virtual-keyboard/live-chat checks remain unverified; 320px reflow and keyboard paths were checked |
| Automated accessibility | Zero reported violations in tested settled states; transformed artwork/decorative symbols leave axe manual contrast-review items. No WCAG conformance claim |
| Preview/operations | No protected preview AI trial, social-service cache preview or disruptive rollback was performed. Existing production was tested without rolling it back |

## Recovery record

Known verified source: 32444e14dcd4b89d68849794e6480b82818d03fd, Vercel deployment 8zxu2kWcFGGr5GT7WzhPEk17JZij, project vijay_portfolio. Its accessible names and metadata were confirmed live. The earlier origin fix a147c8d03188241b1f1bafc4f42ef4d64394c878 was deployment 7uhecPjMtVFLNyyXuXjGTEnfFoWm. Use Vercel deployment controls for recovery; no rollback is claimed exercised. Keep preview and production secrets/storage separate. No paid plan, domain purchase or announcement was made.
