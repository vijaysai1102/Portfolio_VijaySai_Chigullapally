---
name: test-driven-development
description: Use when implementing meaningful application logic, automation, or a reproducible bug fix in this portfolio; verify observable behavior with failing-then-passing tests.
---

Read the root guide and generated project context for the actual test commands. Do not assume Megatron's Vitest/Electron setup exists here.

1. Name the observable break a test should catch. Write a minimal case with independently derived expected values, including the boundary or failure path that matters.
2. Run it and confirm an assertion fails because the behavior is missing or wrong. Repair test setup failures before treating the result as evidence.
3. Implement the smallest complete behavior, rerun the test, and check affected existing tests. Refactor only while behavior stays green.
4. Exercise the real integration when the change crosses filesystem, process, Git, or network boundaries. Use isolated temporary fixtures for destructive cases and verify their resolved paths before cleanup.

Prefer real implementations and controlled fixtures. A mock is justified by a specific slow or external dependency; assertions should describe the real component's contract. Do not test copied implementation text, private structure, exact prose, or framework behavior.

Human guidance, simple styling, constants, and reversible configuration do not earn imitation tests. UI behavior requires the running-site checks in `visual-verify`. Report precisely which behavior was verified and what remains untested.
