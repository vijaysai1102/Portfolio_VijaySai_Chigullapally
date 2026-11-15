# Content evidence and update process

Public data lives in src/content/portfolio.ts; parseProject validates IDs, required fields, arrays, sections and HTTPS destinations and projects only known public fields. Private provenance lives here, outside public content imports. Run test/check/smoke after edits and inspect the resulting page before publishing personal facts. Personal experience, education and credentials remain empty per chat; no resume/email/portrait is supplied.

Reviewed on 2026-11-14 through agent-reach's GitHub CLI route: Megatron README and docs/skill-scanner.md; WeatherScope README, outputs/reports/REPORT.md and src/forecasting.py on master; F1 README, src/ingestion.py and src/rag_agent.py. These were source inspections, not application runtime verification. Case studies must retain that distinction. Source descriptions are allowed; personal contribution/role claims are deferred.

WeatherScope's report concerns global daily means, not local forecasts; compare one-step-ahead 90-day holdout evaluation and retain negative precipitation findings. F1 ingestion reads a local PDF (README download wording does not match implementation); retrieval uses MiniLM embeddings and Chroma, while the generation prompt requests article citations and permits labeled general knowledge. Neither prompting nor a source review proves answer accuracy.
