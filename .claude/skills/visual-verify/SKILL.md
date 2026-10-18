---
name: visual-verify
description: Verify a portfolio UI change in the running website across relevant viewport sizes and interaction states; use after layout, styling, navigation, animation, or form changes.
---

Read the root guide and generated project context. Use the real app's documented start command and browser tooling available in this environment. This repository initially has no website; do not claim a render or copy Megatron's Electron launcher and scenario suite.

Before editing, follow the approved plan and inventory hover effects, animation, pointer handling, keyboard behavior, and state in the affected area. Preserve each interaction unless its change is authorized.

After implementation:

1. Restate the intended visible result and select the changed route/flow plus the shared surfaces it affects.
2. Start the actual site using its existing workflow. Check narrow and wide viewports based on its real breakpoints; inspect navigation, keyboard focus, links, reduced motion, and applicable loading/error/empty states.
3. Exercise the user flow end to end. Check browser console errors and horizontal overflow. For a shared layout or token change, check the other routes that use it.
4. Inspect every screenshot used as evidence. Compare against the approved request and any reviewed baseline; a captured image or passing type check alone is insufficient.
5. Fix defects caused by the change and repeat the affected checks. Report unrelated defects without expanding scope. Keep evidence only where it has an actual review purpose, and verify paths before cleanup.

Use browser automation and screenshots deliberately. If a constrained allowance is known to exceed 50%, state that and request approval before further use unless already authorized. If the app or browser cannot run, report that limitation and the narrower checks completed.
