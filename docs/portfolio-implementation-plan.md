# Vijay Sai Chigullapally — Portfolio Implementation Plan

Prepared: 2026-10-18

Status: execution authorized in chat on 2026-11-14. See `ticket-records.md` for current evidence and limitations.

## Execution amendment — 2026-11-14

The user has authorized building from this plan, reviewing personal details after implementation, and committing/pushing to main after every verified ticket. Continue across tickets without waiting for another instruction. This amendment supersedes the per-ticket waiting instruction below. Preserve all identifiers and dependencies. Use `portfolio-brief.md` for current content rules: FDE/ML positioning and personal experience/education/certification/contribution claims are deferred to information supplied in chat. Public project descriptions require source review. Missing credentials/assets/deployment access are named dependencies, never fabricated completion.

The original plan below is preserved as design context. Historical model/pricing statements are unverified planning notes and must be rechecked before integration. Ticket evidence lives in `ticket-records.md`; a prepared implementation with missing external inputs is partial, not Done.

This document is the working plan for building the portfolio one ticket at a time. Writing this plan does not authorize implementing all tickets or publishing the website. Existing repository guidance remains authoritative for file changes, approvals, and verification.

## 1. Product goal

Build a distinctive, pleasing personal portfolio that helps recruiters and hiring managers evaluate Vijay for Forward Deployed Engineer (FDE) and Machine Learning Engineer roles. Show how he understands a problem, builds a usable system, evaluates its behavior, and explains engineering tradeoffs.

The site should serve two visitor speeds:

- A quick visit: understand Vijay's focus, find strong project evidence, and reach contact or resume links.
- A deeper visit: explore case studies and interactive demonstrations, then discuss the work with a conversational AI guide.

The AI is an optional way to explore the same portfolio. Core information and navigation must remain available when chat is closed, unavailable, or at its usage limit.

## 2. Settled decisions and constraints

| Area | Decision |
| --- | --- |
| Primary audience | Recruiters and hiring managers considering FDE and ML engineering candidates. |
| Overall direction | An interactive engineering studio with expressive typography, generous spacing, and a memorable visual centerpiece. |
| Appearance | A light studio with dark interactive project demos. Exact colors and fonts remain design work. |
| Personal presence | A real portrait with subtle interactive treatment. The actual portrait is still needed. |
| AI behavior | Genuine multi-turn conversation that can also highlight projects, open relevant pages/demos, and explain the current view through a bounded set of actions. |
| Hosting | Vercel. No deployment or account configuration is performed by this planning document. |
| AI provider | Gemini API. Initial model candidate: `gemini-3.5-flash-lite`, subject to availability and portfolio-specific evaluation before launch. |
| Lead project | Megatron. Vijay reports contributions across every part, with most components built by him. Avoid implying sole authorship of every contribution. |
| Megatron problem | Developers accumulate skills/plugins, lose track of installations and updates, and struggle to inspect detailed usage. |
| Megatron feedback | Vijay reports that early users found it helpful in the intended ways. Counts, named quotes, and quantified outcomes have not been supplied. |
| Promotional site | Vijay says he built the Megatron promotional website completely. It includes a sample-data interactive preview. |
| Other proposed flagship projects | WeatherScope AI and the F1 Regulations RAG Agent; verify claims and contribution details when authoring their tickets. |
| Experience | Implement the section structure, leaving employment information empty for Vijay to add later. Do not manufacture employers, dates, titles, or achievements. |
| Certifications | Machine Learning with Python: Foundations; Model Context Protocol (MCP): Hands-On with Agentic AI; ETL in Python and SQL. Issuers, dates, and credential links are pending. |
| Working method | One implementation ticket at a time, with an exact file plan and approval where required by AGENTS.md. |
| Rejected material | **The deleted `portfolio-mockup.jpg` is explicitly rejected. Never use it, restore it, inspect it for inspiration, or derive a design from it. This exclusion also applies if a copy becomes available later.** |

Do not reopen settled choices merely to ask the same question again. Resolve remaining choices when their ticket needs them, recommending an answer and explaining its tradeoff.

## 3. Reference use and evidence

Approved references provide lessons, not assets or layouts to copy:

- [Charith's portfolio](https://charithkapuluru.com/): cohesive visual personality, a recurring character, and interactive technical explanations.
- [Charith's source](https://github.com/CharithKapuluru/charithkapuluru-website): separation of content, scenes, and interactions; selected implementation files were reviewed.
- [Sai's portfolio](https://heysai.dev/): strong visual hierarchy, project exploration, and an AI entry point. Its AI panel was inspected; generated answers and backend behavior were not verified.
- [Vijay's GitHub](https://github.com/vijaysai1102): initial project and biography evidence. Repository descriptions are not proof that every claim or deployed feature works.
- [Megatron](https://github.com/Megatron-HQ/Megatron): selected source, documentation, analytics, scanning, linting, and plugin-management implementations were reviewed. The desktop application was not run during planning.
- [Megatron promotional site](https://megatron-site.vercel.app/): desktop appearance and sample-data preview were inspected. Existing preview reuse still needs an integration feasibility check.
- [WeatherScope AI](https://github.com/vijaysai1102/WeatherScope-AI) and [F1 RAG Agent](https://github.com/vijaysai1102/2026_F1_Spec_RAG_Agent): READMEs reviewed; implementation/results verification belongs to their case-study tickets.

Copy should separate personal contribution, observed implementation, author-reported results, and simulated examples. Do not publish a testimonial or number that has not been supplied and approved. Cost estimates in Megatron must not be represented as actual subscription charges. Locally cached plugin update indicators must not be described as guaranteed live marketplace checks.

## 4. Release scope and proposed architecture

### First-release scope

- Responsive homepage, portrait, featured work, project detail pages, and additional-project collection.
- Megatron, WeatherScope, and F1 RAG case studies, subject to evidence checks.
- A Megatron preview or an approved bounded alternative if reuse is unsuitable.
- Education, supplied certifications, an empty experience structure, and working supplied contact/resume paths.
- Text-based conversational AI with cited portfolio evidence and supported navigation/demo actions.
- Accessible interaction, restrained motion, search/social metadata, usage controls, deployment verification, and maintenance instructions.

### Later candidates, not implicit requirements

Voice conversations, a custom avatar, accounts, persistent cross-device chat, resume/job-description matching, additional ML simulations, live telemetry, a CMS, a blog, multiple visual themes, and broad autonomous-agent workflows. Each needs its own ticket and a reason tied to visitor value. Do not add these to an existing ticket as incidental polish.

### Proposed technical direction to confirm in T07

- Next.js with TypeScript and React, using a documented package manager and committed lockfile. The repository currently has no application framework.
- Structured, version-controlled content separated from components. Use a shared project-detail template rather than separate implementations for each project.
- Semantic HTML and CSS for normal pages; client-side code only for interactions that require it. Use a motion library only where it adds value.
- A server-side Gemini integration with separate modules for evidence selection, generation, action validation, and request limits.
- Browser UI state separated from AI responses. Only validated action identifiers may alter navigation or demo state.
- Begin with a small curated knowledge collection. Choose deterministic selection or retrieval based on evaluation; do not add a vector database merely because the site uses AI.
- Determine durable rate-limit/usage storage before public AI deployment. A process-local counter is not an adequate production limit across Vercel instances.
- Keep secrets in server-side environment configuration. Never put a Gemini key in a public asset, content file, client bundle, or conversation transcript.

Proposed source areas are `src/app`, `src/components`, `src/content`, and `src/lib`. These are planning suggestions, not approval for particular files. Every ticket must inspect the repository as it then exists and name exact paths before editing.

### Model and cost decision

Google's documentation checked during planning lists Gemini 3.5 Flash-Lite as stable, with function calling and structured outputs. Standard pricing checked on 2026-10-18 was $0.30 per million input tokens and $2.50 per million output tokens, including thinking tokens. Recheck before integration/launch; neither price nor availability is a permanent assumption.

Illustration only: 1,000 requests averaging 4,000 input tokens and 500 total billable output tokens would cost about $2.45 for generation. Conversation replay, tool-follow-up calls, retries, thinking, storage, hosting, and other services can change actual costs. A financial ceiling has not been approved.

Sources: [model capabilities](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite), [pricing](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.5-flash-lite).

## 5. Inputs needed at the relevant ticket

| Input or decision | Needed by | Handling until supplied |
| --- | --- | --- |
| Approved portrait and crop preferences | T11 | Use a neutral development-only portrait area; do not substitute a real person's photo or the rejected mockup. |
| Exact public biography and positioning wording | T01/T11 | Draft from supplied facts and confirm material claims. |
| Project contribution and result evidence | T13/T15/T16 | Label unverified claims in working notes; keep them out of published copy and AI knowledge. |
| Education wording | T19 | GitHub supplies a starting point; confirm the public entry before publishing. |
| Certification issuers/dates/URLs | T19 | Display approved titles only; optional metadata may be absent. |
| Resume file and preferred contact links | T20 | No dead download button or invented address. |
| Gemini key and usable account quota | T22 | Configure securely when needed; never ask for the key in chat. |
| Monthly AI ceiling and retention policy | T21/T28 | Propose limits before public deployment. No indefinite conversation retention by default. |
| Vercel project/account and optional domain | T34/T35 | Prepare configuration locally before account actions. |
| Early-user quotes or measurable impact | Optional for T13 | Use the supplied qualitative report; do not block the portfolio on unavailable metrics. |

Missing optional information should not block unrelated tickets. A blocked dependency must be named; do not claim its ticket is complete.

## 6. Ticket execution contract

1. Select one ticket and check its dependencies and latest repository state.
2. Read the relevant project guidance and applicable skills. Preserve existing user changes.
3. Present exact files, intended changes, behavior to preserve, and verification. Obtain approval when required; approval of a ticket does not authorize unrelated tickets.
4. For UI work, inventory nearby hover, pointer, focus, animation, and scrolling behavior before changing it.
5. Implement the smallest complete outcome. Split a ticket if it contains separately reviewable features or an unexpected redesign.
6. Verify observable behavior. Use failing-then-passing behavioral tests for meaningful logic; do not create tests that merely repeat prose or styling constants.
7. Use the visual-verify workflow for UI changes, including narrow/wide layouts and relevant loading, empty, error, keyboard, touch, and reduced-motion states.
8. Run the relevant checks and guidance synchronization check. Report what ran and any verification that could not run.
9. Update the ticket record with changed files, evidence, remaining limitations, and status. When this requires an additional file, include it in the ticket's file plan.
10. Report completion and wait for the user's instruction to start the next ticket. Do not bundle the next ticket into the current one.

Statuses: Planned, Ready, In progress, In review, Done, or Blocked with a named dependency. This document drafts T02; it does not mark T01 or any application ticket Done.

## 7. Roadmap and dependency order

Default execution is numerical order. Dependencies indicate the minimum prerequisites, not permission to execute multiple tickets at once.

| Ticket | Deliverable | Dependencies | Initial status |
| --- | --- | --- | --- |
| T01 | Product brief | None | Ready |
| T02 | Detailed backlog review | T01 | Draft prepared here; review pending |
| T03 | Content and navigation map | T01, T02 | Planned |
| T04 | Visual direction | T03 | Planned |
| T05 | Desktop homepage mockup | T04 | Planned |
| T06 | Mobile homepage mockup | T05 | Planned |
| T07 | Application scaffold | T03, T04, T06 | Planned |
| T08 | Content structure | T07 | Planned |
| T09 | Shared design primitives | T04, T07 | Planned |
| T10 | Navigation and page shell | T03, T06, T09 | Planned |
| T11 | Hero and portrait | T08, T10 | Planned |
| T12 | Project overview | T08, T09, T10 | Planned |
| T13 | Megatron case study | T12 | Planned |
| T14 | Megatron interactive preview | T13 | Planned |
| T15 | WeatherScope case study | T13 | Planned |
| T16 | F1 RAG case study | T13 | Planned |
| T17 | Additional project collection | T12, T15, T16 | Planned |
| T18 | Empty experience structure | T08, T09, T10 | Planned |
| T19 | Education and certifications | T08, T09, T10 | Planned |
| T20 | Resume and contact paths | T10, T11 | Planned |
| T21 | AI knowledge collection | T13, T15, T16, T17, T18, T19, T20 | Planned |
| T22 | Server-side Gemini connection | T07, T21 | Planned |
| T23 | Grounded portfolio answers | T21, T22 | Planned |
| T24 | Conversational context | T23 | Planned |
| T25 | Chat interface | T09, T10, T24 | Planned |
| T26 | AI-guided navigation | T12, T17, T25 | Planned |
| T27 | AI-guided demo exploration | T14, T26 | Planned |
| T28 | Durable usage controls | T22, T24, T26, T27 | Planned |
| T29 | AI quality evaluation | T23–T28 | Planned |
| T30 | Motion and visual polish | T11–T20, T25–T27 | Planned |
| T31 | Search and sharing metadata | T11–T20 | Planned |
| T32 | Accessibility review | T29, T30, T31 | Planned |
| T33 | Performance review | T32 | Planned |
| T34 | Vercel preview deployment | T28, T29, T31, T32, T33 | Planned |
| T35 | Production launch | T34 | Planned |
| T36 | Maintenance handover | T35 | Planned |

Milestones:

- T01–T06: agreed brief, content architecture, and reviewable visual concept.
- T07–T20: working portfolio and first interactive product demonstration.
- T21–T29: grounded conversational guide with bounded actions and verified controls.
- T30–T36: complete-site review, preview, launch, and maintenance.

## 8. Detailed tickets

### T01 — Product brief

**Outcome:** A concise statement of what the portfolio must achieve, for whom, and within which constraints.

**Scope:** Create `docs/portfolio-brief.md` from the settled decisions above. Define the quick visitor journey, deeper exploration journey, primary contact action, intended tone, and how FDE/ML evidence complements each other. Record Megatron ownership as supplied, the empty experience requirement, missing assets, and the permanent exclusion of the rejected mockup. Distinguish qualitative early feedback from measured impact.

**Out of scope:** New design assets, application code, new product features, or another broad interview about already-settled decisions.

**Acceptance:** The brief states audience, message, release boundaries, source-of-truth rules, and success criteria that can be checked. It contains no invented employment, outcomes, or testimonials. Any remaining question has a reason and a ticket that needs it.

**Verification:** Compare the brief against the conversation and this plan; review wording with Vijay. Prose does not require implementation-mirroring tests.

### T02 — Detailed backlog review

**Outcome:** This plan becomes an approved, usable execution backlog.

**Scope:** Review `docs/portfolio-implementation-plan.md` after T01; reconcile wording, dependencies, scope, and open inputs. Preserve all 36 identifiers. Give each ticket a status and define how completion evidence will be appended. This drafting step has already produced the initial backlog, so do not recreate it from scratch.

**Out of scope:** Implementing the tickets, creating remote issues, or modifying unrelated repository guidance.

**Acceptance:** Every ticket has a bounded deliverable, prerequisites, acceptance criteria, and verification. No dependency requires an unimplemented later ticket. Public AI release is gated on usage controls and evaluation. Approval of the backlog remains distinct from approval to execute individual UI/file plans.

**Verification:** Review ticket numbering, dependency ordering, and coverage against the brief. Resolve ambiguity before marking the review Done.

### T03 — Content and navigation map

**Outcome:** A route/section map and visitor journeys that guide subsequent design.

**Scope:** Produce `docs/content-map.md` describing homepage sections, project URLs, additional-work browsing, resume/contact access, and the AI entry point. Assign stable project and section identifiers that can later support links, evidence citations, and AI navigation. Map each content area to its source and readiness. Specify how an empty experience section appears during development and publication; its data remains empty.

**Out of scope:** Final copy for every project, database selection, and visual styling.

**Acceptance:** A visitor can find flagship work and contact information through ordinary links. Deep links have sensible destinations and back navigation. The AI is optional. No required information is accessible only through hover or a demo. The content map does not depend on missing employment facts.

**Verification:** Walk through a short recruiter visit, an ML project review, an FDE project review, and an AI-unavailable visit using the map.

### T04 — Visual direction

**Outcome:** An approved visual language for the light studio and dark demo surfaces.

**Scope:** Prepare a small design board and `docs/design-direction.md` defining typography, color roles, spacing, surfaces, borders, icon style, portrait treatment, and motion intent. Propose one original centerpiece that fits the content rather than introducing a second product. Inventory planned hover, focus, pointer, scroll, and touch interactions, including reduced-motion equivalents. Use approved references for principles only.

**Out of scope:** Final homepage implementation, a second theme, elaborate 3D environments, or use of the rejected mockup in any form.

**Acceptance:** Every visual choice has a consistent role. Light pages and dark demos feel related. Text/action contrast is checked before approval. The portrait treatment accommodates a real supplied image. The centerpiece has a static or lightweight fallback and does not obscure the introduction.

**Verification:** Review the board at normal reading sizes, check proposed color pairs, and obtain design approval before dependent UI work.

### T05 — Desktop homepage mockup

**Outcome:** A reviewable desktop composition before application implementation.

**Scope:** Create a desktop concept using the approved design direction, representative factual content, and a neutral portrait slot if needed. Show the hero, flagship work, a dark demo surface, supporting content, contact, and AI entry point. Include an open-chat state and a project-selected state so the AI is designed as part of the experience. Record decisions in the design notes.

**Out of scope:** Building the production application, generating a substitute portrait, or presenting sample project metrics as real outcomes.

**Acceptance:** The first viewport communicates Vijay's focus and offers a clear next action. The composition supports both fast scanning and deeper exploration. Chat does not permanently hide essential content. The case-study entry points are recognizable without animation.

**Verification:** Review the concept at representative wide widths, including a normal laptop viewport. Confirm hierarchy and interactions with Vijay before T06/T07.

### T06 — Mobile homepage mockup

**Outcome:** An intentional mobile design, including the constrained demo and chat experience.

**Scope:** Adapt the approved desktop composition to narrow screens. Specify navigation expansion, portrait crop, project cards, dark-demo fallback/expansion, chat opening/closing, and virtual-keyboard behavior. Define responsive rules and which decorative effects simplify on small devices. Keep core content ordering consistent unless an approved mobile journey requires a change.

**Out of scope:** New features or a redesign of the approved desktop direction.

**Acceptance:** Ordinary content fits without horizontal scrolling. Controls are comfortably touchable. A visitor can browse projects and contact Vijay without interacting with the AI. Embedded demo overflow is contained and clearly handled. Chat has an obvious close action and preserves the visitor's place.

**Verification:** Review approximately 360px, 390px, and tablet-width compositions, including open navigation and chat. Agree the responsive behavior before coding.

### T07 — Application scaffold

**Outcome:** A reproducible local application foundation with documented commands.

**Scope:** Confirm the proposed framework/package manager and choose supported versions at execution time. Add only the necessary configuration, lockfile, minimal route, and baseline checks. Establish boundaries between content, UI, server AI code, and shared types. Define local environment-variable names without values. Preserve the existing guidance system and incorporate its generated context through the prescribed scripts. Document the production usage-storage decision that must be resolved by T28.

**Likely areas:** Root application configuration, `src/app`, shared TypeScript configuration, and development instructions; exact paths require the ticket file plan.

**Out of scope:** Homepage design, AI integration, new cloud resources, and production deployment.

**Acceptance:** A clean install using the lockfile, local server, and production build work. The minimal route renders. No unnecessary database, auth, or provider SDK is added speculatively. Existing guidance checks remain functional.

**Verification:** Run the documented install/build/check commands and open the running route. Record platform/version assumptions and any environment limitation.

### T08 — Content structure

**Outcome:** Validated content records shared by pages and later AI knowledge preparation.

**Scope:** Define small typed models for profile, projects, education, certifications, experience, and links. Separate public copy from evidence/provenance notes. Use stable identifiers from T03. Represent absent experience as an empty collection and optional certification metadata as absent fields. Validate boundary inputs and normalize URLs deliberately. Establish a simple update process in version-controlled content.

**Likely areas:** `src/content`, content schemas/helpers, and focused behavior tests.

**Out of scope:** CMS integration, publishing unverified claims, and building UI sections.

**Acceptance:** Invalid identifiers/URLs and required missing fields fail clearly. Empty optional content is valid. Public output excludes private notes. Project records can support case-study sections and source links without duplicating biography text across components.

**Verification:** Behavioral tests cover valid records, invalid boundary data, optional fields, and empty experience. Inspect resulting public data for accidental private material.

### T09 — Shared design primitives

**Outcome:** A small consistent set of reusable visual building blocks.

**Scope:** Implement approved tokens and only the primitives required by the mockups: typography, containers, buttons/links, cards, badges, and basic section treatment. Define hover, active, disabled, focus, and dark-surface variants. Keep native element semantics and expose clear component APIs. Provide a temporary development preview if needed for review.

**Out of scope:** A general-purpose design-system package or complete homepage sections.

**Acceptance:** Components match the approved direction, preserve visible focus, and work on both light and dark surfaces. Link and button behavior are semantically distinct. Interactive appearance does not rely on color alone. No excessive component abstraction is introduced.

**Verification:** Visually inspect narrow/wide previews and keyboard states. Check contrast and reduced-motion behavior. Run type/lint checks without adding tests that merely repeat CSS values.

### T10 — Navigation and page shell

**Outcome:** Working navigation, footer, and shared page framing.

**Scope:** Implement the route/section navigation from T03, mobile menu, skip link, footer, active-location treatment, and predictable page anchors. Define opening/closing behavior and restore focus where appropriate. Add an intentional not-found page. Preserve browser back/forward and normal link behavior.

**Out of scope:** Final hero, case-study content, or chatbot functionality.

**Acceptance:** All implemented destinations work; unfinished destinations are not exposed as broken links. Mobile menus close predictably after navigation and via Escape where appropriate. Sticky elements do not cover anchor headings. Keyboard users can bypass repeated navigation.

**Verification:** Run desktop and mobile navigation journeys, direct URL entry, anchor navigation, back/forward, and not-found handling. Check focus and menu state after each action.

### T11 — Hero and portrait

**Outcome:** A clear, personal first impression matching the approved mockups.

**Scope:** Implement the introduction, primary calls to action, real portrait integration, and the approved lightweight visual centerpiece/treatment. Optimize supplied image dimensions and crop. Keep any pointer response subtle, opt out under reduced motion, and provide touch behavior. If the portrait is missing, prepare the slot and report the asset-dependent portion as pending rather than claiming the final hero is complete.

**Out of scope:** Invented biography, employment claims, replacement imagery, and additional decorative scenes.

**Acceptance:** Role positioning and next actions are readable immediately. The real portrait is approved, has appropriate alternative text, and does not cause layout shifts. The hero remains usable with motion disabled. Content fits narrow and wide layouts without overlap.

**Verification:** Visually inspect representative viewport sizes, slower image loading, keyboard focus, touch, and reduced motion. Check that hero links reach their intended destinations.

### T12 — Project overview

**Outcome:** A concise featured-work section with working case-study entry points.

**Scope:** Render selected project records with concise problem/contribution summaries, relevant evidence tags, and intentional thumbnails. Introduce filtering only if the approved design calls for it. Connect stable identifiers and navigation destinations without adding AI behavior yet. Make the entire interaction understandable on touch and keyboard.

**Out of scope:** Full case studies, live model execution, and invented project metrics.

**Acceptance:** Megatron is clearly featured; ML and applied-AI work remain easy to find. Cards expose working destinations and understandable labels. Any filters have a useful empty state and deterministic reset. Hover does not reveal information unavailable otherwise.

**Verification:** Browse every featured item using pointer, keyboard, and touch; verify links, responsive layout, and filtering behavior if implemented. Use behavioral tests for actual filter logic only.

### T13 — Megatron case study

**Outcome:** The first complete case study and a reusable project-detail template.

**Scope:** Build the shared case-study layout while authoring Megatron's problem, Vijay's contribution, user journey, architecture, selected decisions, limitations, and qualitative early feedback. Link to source and the promotional site. Include the website as part of the project's delivery story. Verify material claims against current selected source/docs and distinguish development state from published releases.

**Out of scope:** The interactive embed itself, fabricated adoption metrics, or claiming every contribution is solely Vijay's.

**Acceptance:** The page explains the product to non-specialists and provides technical depth for engineers. Personal ownership is accurately stated. Cost estimates, cached update indicators, and local analysis are described precisely. Source links and project navigation work. The shared template can support T15/T16 without copying the entire implementation.

**Verification:** Trace published claims to approved evidence, walk the complete page on mobile/desktop, and check direct linking and external destinations. Clearly state that a source review is not a desktop runtime test.

### T14 — Megatron interactive preview

**Outcome:** A bounded, useful product demonstration within the portfolio.

**Scope:** First inspect the existing promotional preview's reuse options, responsive behavior, hosting headers, and integration contract. Choose an approved embed or reusable preview implementation. Add explicit sample-data labeling, loading/error states, expand/close behavior, reset, and an external fallback. Record which demo states can later be controlled. If reuse requires substantial host changes or a rebuild, propose a separate ticket before proceeding.

**Out of scope:** Rebuilding Megatron, accessing the visitor's local files, real plugin operations, and pretending a third-party frame supports controls it does not expose.

**Acceptance:** Visitors can explore the approved sample workflows. Keyboard focus can enter and leave the preview. Narrow layouts have a usable presentation. The portfolio remains functional if the preview fails. Any message bridge checks sender/origin and accepts only documented state changes.

**Verification:** Exercise preview views, reset, expansion, load failure, mobile overflow, and keyboard exit. Test any bridge with allowed and rejected messages. Capture the integration limitations for T27.

### T15 — WeatherScope case study

**Outcome:** A substantive ML case study using the shared project template.

**Scope:** Present the problem, data preparation, forecasting comparisons, evaluation design, explainability, interface, contribution, and known limitations. Inspect relevant code and saved report artifacts before selecting metrics. Clarify dataset scope and the distinction between global aggregates and location-specific forecasts. Use approved charts or screenshots with explanatory captions.

**Out of scope:** Retraining the complete project as incidental portfolio work, building a new simulator, or describing README results as independently reproduced.

**Acceptance:** Reported results identify target, metric, evaluation window, and source. Negative or weak results are not omitted to create a misleading story. The project demonstrates modeling judgment as well as interface delivery. Links and visuals are understandable without running the external app.

**Verification:** Cross-check chosen metrics with available artifacts/code, label the level of verification performed, and review the case study across viewport sizes. If artifacts are insufficient, defer the numerical claim.

### T16 — F1 RAG case study

**Outcome:** An applied-AI case study explaining domain retrieval and evidence-backed answers.

**Scope:** Inspect selected ingestion, retrieval, and interface code. Describe document sourcing, retrieval flow, citation behavior, current-information handling, personal contribution, and known limitations. Include an approved example showing a question, supporting passage, and answer. Explain the distinction between regulation-document evidence and optional web-derived information.

**Out of scope:** A guarantee of regulatory correctness, a new live RAG backend for the portfolio, or assuming every citation is correct because the prompt requests citations.

**Acceptance:** The page explains the practical problem and system design. Examples can be traced to evidence and are labeled as recorded examples when appropriate. Any claimed evaluation has an actual basis. External demo availability has a fallback link or recorded explanation.

**Verification:** Check selected examples and source links, inspect relevant implementation, and test the portfolio presentation. If the external service cannot be exercised, record that limit rather than implying end-to-end verification.

### T17 — Additional project collection

**Outcome:** A curated way to explore breadth beyond the three flagship projects.

**Scope:** Select a manageable collection from verified public repositories, potentially including PingBack, nanoGPT experiments, and other relevant work. Confirm attribution for collaborative/forked projects. Add concise summaries and source/demo links, reusing content models and cards. Add category filtering only if it improves the approved visitor journey.

**Out of scope:** Automatically publishing every repository, a separate detailed case study for each item, or claiming ownership from repository presence alone.

**Acceptance:** Each included item contributes a clear signal and has a working destination. Flagship work stays prominent. Tags and summaries are factual. Filtering and empty states, if present, remain accessible and usable on mobile.

**Verification:** Review selection and contribution wording, verify destinations, and exercise browsing/filter behavior. Confirm that no private or unsupported project information is exposed.

### T18 — Empty experience section structure

**Outcome:** An experience section ready for later content, with no employment information inserted.

**Scope:** Implement a reusable experience layout and connect it to the empty collection established in T08. Support the agreed optional fields for future entries. Use synthetic fixtures only in development verification if needed; keep them out of production content, metadata, and AI knowledge. Apply the empty-state presentation agreed in T03, recommending that public empty details are omitted rather than filled with placeholder employers.

**Out of scope:** Inferring employment from GitHub, adding job titles/dates, or collecting the deferred work history now.

**Acceptance:** Production experience data remains empty. The section/layout can render a future entry without redesign. Empty data creates no dead navigation, unexplained gap, or fake timeline. Fixture data is clearly separate and cannot enter the public build.

**Verification:** Inspect empty production state and a development-only populated fixture at narrow/wide widths. Confirm experience claims are absent from public output and knowledge generation.

### T19 — Education and certifications

**Outcome:** Accurate, readable education and certification presentation.

**Scope:** Confirm public education wording from supplied profile material and render the three supplied certification titles. Make issuer, date, and credential URL optional. Add verification links only when supplied and valid. Use the shared design rather than decorative badges implying endorsement or certification levels not stated by the issuer.

**Out of scope:** Inventing providers, dates, credential IDs, or additional achievements.

**Acceptance:** All three titles are represented accurately. Missing optional metadata leaves a finished-looking entry. Education facts are approved. Long certification names wrap correctly on mobile. Links, when present, have meaningful labels and valid targets.

**Verification:** Compare text with the approved content, test records with and without optional metadata, and inspect narrow/wide layouts and keyboard focus.

### T20 — Resume and contact paths

**Outcome:** Working routes for a visitor to act on interest in Vijay.

**Scope:** Integrate the supplied resume and approved contact/social links. Verify labels, document behavior, and external destinations. Prefer direct contact links initially; a backend contact form would require a separate scoped decision. Add a consistent contact area and maintain access from project pages and the site shell.

**Out of scope:** Sending messages, generating a resume, inventing contact details, or a form delivery service.

**Acceptance:** Resume access works with the supplied asset. Contact destinations are verified with Vijay. Missing assets do not produce a fake download or broken link. Links are accessible and do not depend on chat. Any public contact data is included deliberately.

**Verification:** Exercise resume access and contact navigation on desktop/mobile, inspect the downloaded/opened document when available, and check link targets without sending a message. Mark asset-dependent work pending if required input is missing.

### T21 — AI knowledge collection

**Outcome:** A small, approved evidence collection for portfolio conversations.

**Scope:** Derive public knowledge from approved profile/project content, with stable source IDs, URLs/anchors, contribution descriptions, and update dates. Exclude rejected assets, private notes, empty experience, and unsupported claims. Select a simple retrieval approach appropriate to corpus size. Define handling for unknown questions and the proposed conversation-data retention policy. Build representative evaluation questions early.

**Out of scope:** Crawling all GitHub content into prompts, unrestricted web browsing, a vector database without a demonstrated need, or storing visitor conversations indefinitely.

**Acceptance:** Each factual entry has provenance and an update path. Relevant evidence can be selected for project-specific questions. Missing information is explicit. Page content and AI knowledge do not drift into separate biographies. The retention decision is documented before public chat.

**Verification:** Test representative query-to-evidence cases, ambiguous project references, missing employment questions, and content updates. Manually inspect selected sources and excluded data.

### T22 — Server-side Gemini connection

**Outcome:** A private, bounded generation endpoint that streams and handles failures.

**Scope:** Recheck model availability/pricing and choose a supported SDK or direct API integration. Configure the key securely on the server. Implement input validation, message-size/output limits, timeouts, cancellation, bounded retries, and minimal usage measurement. Add a feature gate; this endpoint remains local or access-protected until T28/T29 pass. Separate provider-specific code from route orchestration.

**Out of scope:** Public unrestricted AI access, full retrieval orchestration, navigation tools, and committing credentials.

**Acceptance:** A valid request streams a response. Invalid requests fail before model calls. Timeout, quota, provider error, and cancellation have explicit behavior. The key is absent from client output. Paid model calls are bounded and usage is observable.

**Verification:** Use mocked-provider behavioral tests for request/error paths, then a small real API smoke test when a key is configured. Check server/client boundaries and stop/cancel behavior. A mock passing alone does not establish a working live integration.

### T23 — Grounded portfolio answers

**Outcome:** Useful answers supported by approved portfolio evidence.

**Scope:** Connect evidence selection to generation; define answer style, source references, and explicit handling of unknown facts. Render or return references from validated source IDs rather than trusting arbitrary model-generated URLs. Treat visitor input and quoted repository text as untrusted content. Distinguish factual biography/project answers from clearly labeled general explanations.

**Out of scope:** Navigation execution, invented achievements, open-ended external research, and promises that grounding eliminates all errors.

**Acceptance:** Representative factual answers cite relevant approved evidence. Unsupported experience, metrics, and personal questions do not elicit invented answers. Attempts to override instructions do not expose private configuration or broaden capabilities. The assistant is clearly presented as Vijay's AI guide.

**Verification:** Run factual, ambiguous, unsupported, and adversarial questions. Verify source relevance and claim support manually, alongside deterministic validation tests. Record observed failures for T29.

### T24 — Conversational context

**Outcome:** Multi-turn dialogue that remains coherent within explicit context limits.

**Scope:** Maintain bounded conversation state and supply the current project/view as structured context. Define reset, cancellation, project changes, and treatment of older turns. Keep chat state session-scoped unless a different retention policy is approved. Preserve necessary provider tool-response context using the supported API rather than manually guessing protocol behavior.

**Out of scope:** Cross-device accounts, long-term visitor memory, or assuming old model answers are authoritative portfolio facts.

**Acceptance:** Follow-ups such as "why did you choose that?" resolve to the correct current topic. Switching projects updates context. Reset clears the conversation. Long chats remain within token limits without erasing important current intent. Concurrent requests cannot mix sessions.

**Verification:** Exercise multi-turn scripts with follow-ups, corrections, topic changes, cancellation, reset, and context-window boundaries. Verify session isolation and model-call bounds with behavioral tests and a real conversation smoke test.

### T25 — Chat interface

**Outcome:** A usable conversational surface integrated with the approved visual design.

**Scope:** Implement the launcher/panel, message input, streaming text, source links, suggested prompts, and send/stop/retry/reset/close controls. Handle empty, loading, disconnected, error, and limit states. Keep panel state separate from conversation/provider logic. Preserve the underlying page location when opening and closing chat.

**Out of scope:** Voice, user accounts, a custom animated character, or executing navigation actions before T26.

**Acceptance:** Keyboard and touch users can complete a conversation and return to the page. Focus is placed/restored intentionally. Streaming announcements do not overwhelm assistive technology. Links are safe and readable; generated markup is not executed. Mobile input remains usable with the virtual keyboard.

**Verification:** Use the running site to send, stream, stop, retry, reset, and close. Test error/limit states, long messages, source links, narrow layouts, and keyboard focus. Confirm chat unavailable does not impair the portfolio.

### T26 — AI-guided navigation

**Outcome:** The guide can take visitors to relevant portfolio content through validated actions.

**Scope:** Define a small action registry such as opening a known project, showing a known section, or highlighting a known card. Validate action names and identifiers server-side and client-side. Connect actions to the same navigation state used by manual controls. Make requested actions understandable and preserve back/forward and user cancellation. Avoid surprise page changes for questions that only ask for an explanation.

**Out of scope:** Arbitrary URLs, script execution, DOM selectors generated by the model, external messages, or destructive actions.

**Acceptance:** Explicit requests open the correct known destination. Unsupported actions and unknown IDs fail safely. Manual navigation remains fully functional. Rapid or stale responses do not override a newer visitor choice. Tool-call loops have an explicit limit.

**Verification:** Test natural-language requests, ambiguous requests, invalid IDs, repeated calls, stale responses, manual navigation during generation, and keyboard focus after navigation. Verify the complete browser-to-model-to-navigation path.

### T27 — AI-guided demo exploration

**Outcome:** The AI can guide the supported Megatron preview states and explain them accurately.

**Scope:** Use the actual capability contract recorded in T14. Add only supported state changes such as opening Skills, Plugins, or Usage, and send current demo state back as structured context. Distinguish sample data from real outcomes. If the preview exposes no safe control bridge, limit actions to opening the preview and provide textual guidance; document the limitation rather than fabricating control.

**Out of scope:** Real desktop operations, modifying installations, a new preview hosting integration hidden inside this ticket, or reading the visitor's local environment.

**Acceptance:** The assistant's explanation matches the displayed demo state. Unsupported transitions receive a clear fallback. Sample metrics are never represented as Vijay's personal usage or adoption results. Manual demo changes update context or are explicitly outside the integration's capabilities.

**Verification:** Run a conversational walkthrough, manual state change, reset, unavailable-frame scenario, stale-action scenario, and invalid-message case. Inspect both the visible demo and the assistant's explanation.

### T28 — Durable usage controls

**Outcome:** Public AI usage is bounded across deployment instances and visible to the owner.

**Scope:** Agree a financial ceiling and practical request/token limits. Implement durable rate/concurrency controls, bounded input/history/output, tool-step limits, and usage accounting that includes retries and tool-follow-up calls. Select the simplest suitable storage and document any service cost. Reserve estimated allowance before expensive work and reconcile measured usage afterward. Add a model-disable switch and a user-facing fallback when limits or storage are unavailable.

**Out of scope:** An elaborate billing dashboard, subscriptions, or relying on budget-alert emails as a hard spending cap.

**Acceptance:** Limits work across simulated parallel instances, not just one process. Requests exceeding limits do not call the model. Failed requests release reservations appropriately; uncertainty is handled conservatively. Retained records follow the approved policy. Public release cannot silently bypass missing controls.

**Verification:** Test concurrency, race conditions, retries, tool chains, storage outages, token overages, and quota exhaustion. Inspect accounting and exercise the UI fallback. Explain residual differences between application estimates and provider billing.

### T29 — AI quality evaluation

**Outcome:** An evidence-based decision that the selected model and guide are ready for visitors.

**Scope:** Finalize a versioned evaluation set covering project facts, personal contributions, unknown information, sources, follow-ups, navigation, demo guidance, and adversarial requests. Include representative FDE and ML reviewer questions. Measure answer quality, action correctness, latency, and billable usage. Compare a stronger Gemini option only if failures justify it, with a cost comparison before changing the default.

**Out of scope:** A claim of universal accuracy, upgrading every request without evidence, or using the tested questions as hardcoded responses.

**Acceptance:** All deterministic action/safety cases pass. Every publish-blocking factual error is resolved. A proposed launch bar is at least 90% acceptable answers on a minimum 30-question representative set, with zero invented employment/ownership claims or unsupported actions in that set; approve the rubric before running the final evaluation. Latency/cost observations are recorded with test conditions.

**Verification:** Run and manually review the evaluation, including multi-turn cases and at least two runs of nondeterministic critical scenarios. Record failures, fixes, model ID, date, and residual limitations. This evaluation supplements per-ticket tests.

### T30 — Motion and visual polish

**Outcome:** A cohesive final presentation with purposeful, restrained interaction.

**Scope:** Review existing transitions, hover/pointer behavior, focus feedback, image treatment, spacing, and dark-demo integration. Refine the approved centerpiece and transitions between content and guided exploration. Inventory every touched interaction and specify what is preserved. Apply reduced-motion and touch equivalents consistently.

**Out of scope:** A new art direction, extra scenes, voice, a second theme, or changes to factual content and AI behavior.

**Acceptance:** Motion supports comprehension and does not delay essential content. No scroll trap, pointer-only control, or obscured text is introduced. Chat and manual navigation remain predictable. Typography and spacing feel consistent across case studies and homepage.

**Verification:** Visually verify narrow/wide layouts and hover, focus, open-menu, chat, demo, loading, and reduced-motion states. Recheck any neighboring interactions affected by styling changes.

### T31 — Search and sharing metadata

**Outcome:** Accurate page previews and discoverable public content.

**Scope:** Add unique titles/descriptions, canonical rules, sitemap, robots configuration, social preview assets, favicon, and appropriate structured data based only on approved facts. Handle preview deployments separately from the production origin. Ensure project routes have meaningful metadata and not-found URLs behave correctly.

**Out of scope:** Search-ranking guarantees, analytics tracking expansion, or fictional structured-data credentials/reviews.

**Acceptance:** Public pages have correct, distinct metadata. Preview origins do not become production canonicals. Sitemap entries resolve. Social images render legibly. Empty experience and missing credentials do not produce false structured data. AI endpoints are not indexed as content pages.

**Verification:** Inspect rendered HTML and assets, validate sitemap/robots and representative metadata, and check link previews where tools allow. Repeat production-origin checks in T35.

### T32 — Accessibility review

**Outcome:** The complete site can be used through supported input and assistive patterns.

**Scope:** Audit the assembled experience: headings/landmarks, labels, contrast, zoom/reflow, focus, menus/dialogs, chat announcements, demo boundaries, and reduced motion. Combine automated checks with manual keyboard and screen-reader review where available. Fix issues within the existing design; larger redesigns become separate tickets.

**Out of scope:** Treating an automated score as proof of complete accessibility or deferring basic accessibility until this ticket.

**Acceptance:** Core journeys are operable without a pointer. No unresolved critical/serious automated findings remain without documented review. Text remains readable at increased zoom, focus is visible, and chat/demo states have meaningful feedback. Scope any standards-conformance claims to the actual audit performed.

**Verification:** Complete homepage-to-project-to-contact and chat-guided journeys with keyboard, check zoom and narrow reflow, test reduced motion, and perform assistive-technology checks where possible. Record tools, scope, and remaining limitations.

### T33 — Performance review

**Outcome:** The main portfolio stays fast while rich features load only when useful.

**Scope:** Measure production-build loading and interaction costs. Optimize portrait/assets/fonts, reserve dimensions, defer demos and chat dependencies, and inspect network/bundle behavior. Separate core-page readiness from optional preview initialization. Agree reproducible test conditions and resource budgets before judging results.

**Out of scope:** Rewriting working architecture for a benchmark score or claiming field Core Web Vitals from a local lab run.

**Acceptance:** Proposed targets under documented mobile lab conditions are LCP at or below 2.5 seconds and CLS at or below 0.1, with responsive key interactions. Field INP at or below 200ms is a post-launch monitoring target when sufficient data exists. No initial AI request is needed to render the page. Any unmet target has an explained cause and approved disposition.

**Verification:** Measure the production build under consistent throttling; compare homepage and a project page before/after changes. Exercise menu, chat, and demo activation. Document measurements and environment rather than claiming universal device performance.

### T34 — Vercel preview deployment

**Outcome:** A deployed preview verified across frontend, server, Gemini, and usage storage.

**Scope:** Link the approved Vercel project, configure preview-scoped server secrets, and deploy the reviewed build. Follow applicable Vercel deployment/environment skills. Verify routes, content assets, streaming, usage controls, action execution, and error handling in the deployed runtime. Keep preview indexing and access settings intentional. Prepare all local configuration before any required account-action approval.

**Out of scope:** Production promotion, domain purchase, changing unrelated Vercel projects, or broad account permissions.

**Acceptance:** The preview URL runs the intended revision. Gemini credentials remain server-side. Public access, if allowed, is protected by the tested controls. Links, demo fallback, chat, and navigation work end to end. Server timeouts and deployment differences have been checked. Required environment-variable names are documented without values.

**Verification:** Run complete desktop/mobile journeys on the actual preview, including a real grounded answer and navigation action, quota/limit fallback, provider failure, and preview reload. Inspect relevant server errors/usage without exposing private data.

### T35 — Production launch

**Outcome:** The approved portfolio is live with a tested recovery path.

**Scope:** Review the final preview and remaining content inputs. Configure production-scoped settings, optional supplied domain, correct canonical origin, and minimal operational monitoring. Promote the exact reviewed revision when authorized. Establish rollback and AI-disable procedures and verify them at an appropriate safe level. Use only approved analytics/retention choices.

**Out of scope:** Domain purchases, paid plan upgrades, broad marketing campaigns, or sending announcements without explicit authorization.

**Acceptance:** The intended domain/URL serves the reviewed build. Production links, assets, metadata, and AI journeys work. No fixture experience or missing portrait placeholder is accidentally presented as final content. The owner can disable AI without taking down the portfolio. Rollback destination and steps are known.

**Verification:** Check production homepage, all flagship pages, resume/contact, demo, chat/navigation, limit behavior, canonical metadata, and mobile layout. Confirm monitoring records the relevant operational signals. Record deployment URL/revision and rollback instructions.

### T36 — Maintenance handover

**Outcome:** Vijay can maintain the site and its AI behavior without rediscovering the implementation.

**Scope:** Write a concise maintenance guide covering content edits, adding future experience, portrait/resume replacement, certification metadata, knowledge refresh, model configuration, evaluation reruns, secret management, deployment, usage review, AI shutdown, and rollback. Document the source/preview integration contract and what to check when upstream Megatron changes.

**Out of scope:** New product features, a CMS build, or an ongoing automated job without separate authorization.

**Acceptance:** Procedures use real commands and paths from the finished application. No secret values are included. Content changes have a clear validation/preview path. The model and pricing recheck process is documented. Known limitations and deferred tickets are easy to find.

**Verification:** Follow one representative content-update procedure in a safe preview or temporary branch, then confirm knowledge/metadata behavior. Review deployment/rollback and usage instructions against the actual configuration. Record handover completion and any deferred work.

## 9. Completion record template

Append a record when reviewing or closing a ticket; do not mark future work complete based on this plan.

```text
Ticket:
Status:
Approved scope and file plan:
Files changed:
Behavior preserved or intentionally changed:
Verification performed:
Evidence / preview / screenshots:
Verification not performed and why:
Remaining inputs or limitations:
Follow-up ticket, if needed:
```

## 10. Immediate next step

Review this detailed plan, then start **T01 — Product brief** as the first separately scoped ticket. T02 will review and finalize the backlog after the brief; application scaffolding begins only at T07. No application files, deployment settings, or AI credentials are changed by this planning task.
