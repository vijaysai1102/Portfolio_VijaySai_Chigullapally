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
  { id: 'megatron', title: 'Megatron', category: 'Developer tools', summary: 'A local-first control center for Claude Code skills, plugins, and usage.', stack: ['Electron', 'React', 'TypeScript', 'SQLite'], source: 'https://github.com/Megatron-HQ/Megatron', sections: [] },
  { id: 'weatherscope', title: 'WeatherScope AI', category: 'Machine learning', summary: 'From weather observations to forecasting comparisons, explainability, and an exploratory dashboard.', stack: ['Python', 'scikit-learn', 'Streamlit'], source: 'https://github.com/vijaysai1102/WeatherScope-AI', sections: [] },
  { id: 'f1-rag', title: 'F1 Regulations RAG', category: 'Applied AI', summary: 'A document-retrieval assistant for exploring Formula 1 technical regulations with supporting context.', stack: ['Python', 'Gemini', 'ChromaDB'], source: 'https://github.com/vijaysai1102/2026_F1_Spec_RAG_Agent', sections: [] },
].map(parseProject);

export const getProject = (id: string) => projects.find(project => project.id === id);
