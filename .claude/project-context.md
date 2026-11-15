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

Content fingerprint (SHA-256, text line endings normalized): `a85cf040125f7d50e30431c8c5152255807dba93e9c201699b212218f9f5cf46`.

- `docs/homepage-concept.html`
- `eslint.config.mjs`
- `next.config.ts`
- `package.json`
- `scripts/Smoke-Portfolio.mjs`
- `src/app/api/chat/route.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/app/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/robots.ts`
- `src/app/share/route.tsx`
- `src/app/sitemap.ts`
- `src/components/about.tsx`
- `src/components/additional-work.tsx`
- `src/components/contact.tsx`
- `src/components/credentials.tsx`
- `src/components/experience.tsx`
- `src/components/footer.tsx`
- `src/components/guide.tsx`
- `src/components/header.tsx`
- `src/components/hero.tsx`
- `src/components/megatron-demo.tsx`
- `src/components/primitives.tsx`
- `src/components/project-art.tsx`
- `src/components/use-demo-view.ts`
- `src/components/use-guide.ts`
- `src/components/work.tsx`
- `src/content/model.ts`
- `src/content/portfolio.ts`
- `src/lib/chat-contract.ts`
- `src/lib/contact.ts`
- `src/lib/conversation.ts`
- `src/lib/demo.ts`
- `src/lib/grounding.ts`
- `src/lib/guide-actions.ts`
- `src/lib/guide-display.ts`
- `src/lib/guide-stream.ts`
- `src/lib/knowledge.ts`
- `src/lib/server/gemini.ts`
- `src/lib/server/request.ts`
- `src/lib/server/site.ts`
- `src/lib/server/sse.ts`
- `src/lib/server/usage.ts`
- `tests/portfolio.test.ts`
- `tsconfig.json`
- `vercel.json`

Git-ignored files, environment files, generated output, dependency trees, and guidance infrastructure are excluded. This inventory does not execute package scripts or infer design decisions. Update manual guidance when code changes alter how the project should be developed or verified.
