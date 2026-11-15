# Accessibility review

Reviewed the actual deployed site and rebuilt local production app on Windows on 2026-11-15 using Orca Chromium. This updates the earlier source-only review; it does not certify WCAG conformance.

## Completed checks

- Homepage, three cases and 404 at 320, 390, 768 and 1440 CSS-pixel widths: no horizontal overflow. Inspected narrow route screenshots, wide homepage/project overview, mobile contact section and narrow/wide demo/guide dialogs. Fonts loaded and no application console errors were captured.
- Keyboard skip link focuses main. Mobile menu opens, Escape dismisses and restores button focus, and Contact selection closes it and scrolls to the destination. Pointer activation opens a featured case. Hover responds; reduced-motion emulation yields automatic scrolling and zero transition duration.
- Direct #demo-skills loads Skills. Unmatched search shows the empty state; changing views clears search; reset restores Overview and #demo-overview. Expansion opens a native modal, keyboard focus stays inside, and Escape closes it and returns focus to Expand.
- Guide opens with its accessible dialog name, checks availability, reports offline and disables sending. At 360px the dialog and privacy copy fit within the viewport; its conversation area scrolls. Escape restores launcher focus. Live conversation/virtual keyboard could not be verified without configuration.
- Axe-core 4.14.0 found visible-label/name mismatches in the footer wordmark and homepage scroll link. Corrected accessible labels without changing destinations/styles. Rebuilt and reran axe: zero reported violations across all five page states and tested modal states. A settled live homepage rerun also reported zero violations. Wait for fonts/arrival animations to finish when auditing; partial-opacity arrival can temporarily affect contrast results.
- Production HTTP regressions cover language, one main/h1, focusable skip targets, unique IDs including both demo copies, real fragment destinations and input/ARIA label associations. Lint's JSX accessibility rules pass.

## Limits

Axe retains incomplete contrast checks on transformed illustrations, decorative arrows/icons and some art text. Inspect those manually; image roles and labels explain the conceptual artwork. Guide close uses an icon with a descriptive accessible name. The privacy copy is visible with computed colors rgb(98,102,93) on rgb(245,243,238).

320px reflow was checked; native 200%/400% zoom was not established by available key simulation (viewport/device scale did not change). Manual NVDA or equivalent reading order/announcements, physical touch and mobile virtual-keyboard/live-AI states remain unverified. Lighthouse's 100 accessibility score on home and Megatron is another automated result, not a replacement for these checks.

Raw reports are ignored in .agent-guidance/browser-review.json and axe-*.json; Orca screenshots expire in its temporary directory. This document records the durable scope and results without depending on those files remaining available.
