# Performance review

Measured production output on Windows, Node 22.23.2, without browser/device/network throttling. These are asset counts and gzip estimates, not LCP, CLS, INP, TTFB or field Core Web Vitals.

| Homepage output | Before T33 | After T33 |
| --- | ---: | ---: |
| HTML bytes | 37417 | 38101 |
| Initial script files | 8 | 8 |
| Initial JS bytes | 615108 | 606859 |
| Initial JS gzip estimate | 191459 | 188349 |

Initial scripts were identified from the generated homepage HTML and compressed individually with Node gzip. Hosting/Brotli/cache behavior may differ. Full raw reports remain in ignored .agent-guidance/perf-before.json and perf-after.json.

DM Sans (36,932 bytes) and Manrope (24,532 bytes) Latin variable WOFF2 files are now local assets, with their original SIL Open Font Licenses. next/font/local preloads them and generates adjusted Arial fallbacks. Production HTTP verifies both WOFF2 responses and absence of the previous external font stylesheet import. No browser Google Fonts request is required.

Guide transport decoding and its public source registry load only when a real response needs them. Display cleanup is a small independent module. No initial AI request is made by application initialization; availability is checked only when the visitor opens the guide. The demo remains scoped to the Megatron route, uses small local sample data and has no provider execution. Core pages are statically generated.

## Deployed mobile lab follow-up — 2026-11-15

Ran Lighthouse 13.6.0 CLI against https://vijayportfolio-eight.vercel.app with isolated headless Chrome 157.0.8103.78, performance/accessibility categories, default mobile simulation (412x823, device scale 1.75), simulated 150ms RTT/1638.4Kbps and 4x CPU slowdown. No custom warm-cache or throttling override was supplied. Revision 32444e14dcd4b89d68849794e6480b82818d03fd was confirmed deployed before the final runs. Raw JSON is ignored in .agent-guidance/lighthouse-live-home-final.json and lighthouse-live-megatron.json.

| Route | Performance | Accessibility | LCP | CLS | Total blocking time |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 96 | 100 | 1.20s | 0 | 217ms |
| Megatron | 92 | 100 | 1.27s | 0 | 353ms |

Both completed without run warnings or runtime errors. An earlier homepage run measured 94 performance, 2.08s LCP, zero CLS and 242ms blocking time, illustrating normal run/hosting variability. Measured runs meet the plan's LCP <=2.5s and CLS <=0.1 lab targets. Blocking time remains an optimization opportunity on the interactive case route; it does not establish field INP.

Orca browser checks separately confirmed loaded local fonts, menus, dialogs, demo interaction, reduced motion and no horizontal overflow at reviewed widths. Field Core Web Vitals, real-device/virtual-keyboard performance and long-term traffic behavior remain unmeasured. These scores are not a universal device or accessibility-conformance claim.
