import { parseProject, publicUrl, type Credential, type Experience } from './model';

export const profile = {
  name: 'Vijay Sai Chigullapally', shortName: 'Vijay Sai',
  github: publicUrl('https://github.com/vijaysai1102'),
  experience: [] as Experience[], education: [] as Credential[], certifications: [] as Credential[],
  resume: undefined as string | undefined,
  email: undefined as string | undefined,
  portrait: undefined as { src: string; alt: string } | undefined,
};
export const projects = [
  { id: 'megatron', title: 'Megatron', category: 'Developer tools', summary: 'A local-first control center for Claude Code skills, plugins, and usage.', stack: ['Electron', 'React', 'TypeScript', 'SQLite'], source: 'https://github.com/Megatron-HQ/Megatron', sections: [
    { heading: 'The problem', body: 'An expanding tool collection becomes difficult to understand. Skills live across global folders, project repositories, and plugin installations; usage history adds another layer to inspect.' },
    { heading: 'How the system fits together', body: 'A desktop interface brings inventory, skill inspection, local lint findings, and usage views together. The scanner distinguishes global, project, and plugin sources. A local index supports browsing without sending the indexed material to a model.' },
    { heading: 'Decisions that matter', body: 'Skill inspection is read-only. Existing plugin actions use the Claude CLI with scope and repository boundaries. This keeps product operations close to the tool that owns the installation rather than directly editing executable skill definitions.' },
    { heading: 'Boundaries and limitations', body: 'Marketplace indicators compare locally cached versions; they are not live marketplace checks. Usage costs are approximate API-equivalent estimates, not subscription bills. Desktop behavior has not been reproduced for this portfolio source review, and personal contribution details will be added separately.' },
  ] },
  { id: 'weatherscope', title: 'WeatherScope AI', category: 'Machine learning', summary: 'From weather observations to forecasting comparisons, explainability, and an exploratory dashboard.', stack: ['Python', 'scikit-learn', 'Streamlit'], source: 'https://github.com/vijaysai1102/WeatherScope-AI', sections: [] },
  { id: 'f1-rag', title: 'F1 Regulations RAG', category: 'Applied AI', summary: 'A document-retrieval assistant for exploring Formula 1 technical regulations with supporting context.', stack: ['Python', 'Gemini', 'ChromaDB'], source: 'https://github.com/vijaysai1102/2026_F1_Spec_RAG_Agent', sections: [] },
].map(parseProject);

export const getProject = (id: string) => projects.find(project => project.id === id);
