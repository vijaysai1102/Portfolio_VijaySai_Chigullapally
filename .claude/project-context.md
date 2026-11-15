# Generated project context

Generated from the current repository by `scripts/Sync-AgentGuidance.ps1`. Do not edit this section or either project-context.md file by hand.

## Application

Package: `vijay-portfolio`.
Detected framework/tool dependencies: next, react.

### Package scripts

- `build`: `next build`
- `check`: `npm run lint && npm run typecheck && npm test && npm run build`
- `dev`: `next dev --hostname 127.0.0.1`
- `lint`: `eslint .`
- `smoke`: `node scripts/Smoke-Portfolio.mjs`
- `start`: `next start --hostname 127.0.0.1`
- `test`: `tsx --test tests/portfolio.test.ts`
- `typecheck`: `tsc --noEmit`

Lockfiles: package-lock.json. Use the matching package manager; investigate mixed lockfiles.

## Code and configuration inventory

Content fingerprint (SHA-256, text line endings normalized): `5d6b6cab41bbc932c61a98f792b92feb03b7f62feba89799171b0f8bab24c534`.

- `docs/homepage-concept.html`
- `eslint.config.mjs`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `scripts/Smoke-Portfolio.mjs`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/content/model.ts`
- `src/content/portfolio.ts`
- `tests/portfolio.test.ts`
- `tsconfig.json`

Git-ignored files, environment files, generated output, dependency trees, and guidance infrastructure are excluded. This inventory does not execute package scripts or infer design decisions. Update manual guidance when code changes alter how the project should be developed or verified.
