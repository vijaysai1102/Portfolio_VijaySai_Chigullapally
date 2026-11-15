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

Full checks/build/production HTTP passed. Mobile lab LCP <=2.5s, CLS <=0.1, interactive menu/dialog behavior, actual font swapping and post-launch INP targets remain unmeasured because the browser host is unavailable. No performance score or universal device claim is made. Run the browser plan in accessibility-review.md and measure the deployed production build under documented throttling before final signoff.
