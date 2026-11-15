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

Content fingerprint (SHA-256, text line endings normalized): `fcb8813c4d82af8c1c72ea6cba4d414a3386d4a33f77f87e8d726ba5ef79ec78`.

- `docs/homepage-concept.html`
- `eslint.config.mjs`
- `next-env.d.ts`
- `next.config.ts`
- `package.json`
- `scripts/Smoke-Portfolio.mjs`
- `src/app/api/chat/route.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/app/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/components/about.tsx`
- `src/components/additional-work.tsx`
- `src/components/contact.tsx`
- `src/components/credentials.tsx`
- `src/components/experience.tsx`
- `src/components/footer.tsx`
- `src/components/header.tsx`
- `src/components/hero.tsx`
- `src/components/megatron-demo.tsx`
- `src/components/primitives.tsx`
- `src/components/project-art.tsx`
- `src/components/work.tsx`
- `src/content/model.ts`
- `src/content/portfolio.ts`
- `src/lib/chat-contract.ts`
- `src/lib/contact.ts`
- `src/lib/demo.ts`
- `src/lib/knowledge.ts`
- `src/lib/server/gemini.ts`
- `src/lib/server/request.ts`
- `src/lib/server/sse.ts`
- `tests/portfolio.test.ts`
- `tsconfig.json`

Git-ignored files, environment files, generated output, dependency trees, and guidance infrastructure are excluded. This inventory does not execute package scripts or infer design decisions. Update manual guidance when code changes alter how the project should be developed or verified.
