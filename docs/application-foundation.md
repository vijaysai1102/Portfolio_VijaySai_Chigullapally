# Application foundation

Next.js App Router 16.4.6, React 19.3.1, TypeScript 5.9, npm lockfile. Version availability checked at execution time. Node 22.13+ is recommended (verified runtime 22.23.2); invoke the installed runtime directly if another shell resolves an older NVM selection. Do not change the user's global NVM version as part of verification.

Use `npm ci`, `npm run dev`, `npm run check`, and `npm run smoke`. On Windows use `npm.cmd`. Tests deliberately name their entry file instead of relying on shell glob expansion. The smoke check starts the actual production Next server, requests the homepage, checks the response, and stops its own child process. It does not establish browser rendering or keyboard accessibility.

Content, UI, and server logic have separate source directories. Do not add an auth system, vector database or CMS. Public AI remains off until the live Gemini model and durable Redis REST usage limits are configured and tested. A Redis transaction must enforce daily and session counters across instances; fail closed when storage is unavailable. A process-local counter is insufficient. No new cloud resources are created by scaffolding.

The current Next lint plugins constrain ESLint to version 9; upgrading ESLint to 10 produced incompatible peer requirements. Keep the compatible release until the plugin ecosystem permits a verified upgrade. npm reports seven moderate development-only advisories through minimatch/typescript-eslint; a compatible audit fix did not resolve them. Production-only audit reports zero advisories. No force upgrades or lifecycle-policy changes were applied.

Sources used to check supported setup: https://nextjs.org/docs/app/getting-started/installation and npm package metadata. Server API integration reference: https://ai.google.dev/api/generate-content . Historical model/pricing claims in the original plan are not current evidence.
