# Search and sharing

Page titles/descriptions derive from public content. Canonical links and the 1200×630 share image are included only with an explicit valid HTTPS SITE_URL; no guessed domain or biography enters metadata. /share serves the code-generated PNG and /icon.svg is the original favicon. The production HTTP smoke saves the share response to ignored .agent-guidance/share-preview.png for artifact inspection.

Unconfigured and Vercel preview builds request no indexing and return an empty sitemap. Vercel production with SITE_URL is indexable; other production hosts additionally require SITE_INDEXABLE=true. This is crawler guidance, not access control. Set environment values before rebuilding because metadata/robots/sitemap are generated at build time. Keep preview secrets and access protection separate from search configuration.

Before launch: confirm final origin, canonical links on each page, share image/text in actual link-preview services, robots/sitemap on the deployed host and intentional preview access. No SEO ranking or social-cache refresh is guaranteed by local metadata checks.
