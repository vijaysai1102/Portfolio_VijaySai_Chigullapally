import { parseProject, publicUrl, type Credential, type Experience } from './model';

export const profile = {
  name: 'Vijay Sai Chigullapally', shortName: 'Vijay Sai',
  github: publicUrl('https://github.com/vijaysai1102'),
  experience: [] as Experience[],
  education: [{
    title: 'Master’s in Computer Science and Engineering',
    issuer: 'University of North Texas',
    date: 'August 2024 – May 2026',
    gpa: '4.0',
  }] as Credential[],
  certifications: [] as Credential[],
  resume: undefined as string | undefined,
  email: undefined as string | undefined,
  portrait: undefined as { src: string; alt: string } | undefined,
};
export const projects = [
  { id: 'megatron', title: 'Megatron', category: 'Developer tools', summary: 'A local-first control center for Claude Code skills, plugins, and usage.', stack: ['Electron', 'React', 'TypeScript', 'SQLite'], source: 'https://github.com/Megatron-HQ/Megatron', website: 'https://megatron-site.vercel.app/', sections: [
    { heading: 'The problem', body: 'An expanding tool collection becomes difficult to understand. Skills live across global folders, project repositories, and plugin installations; usage history adds another layer to inspect.' },
    { heading: 'How the system fits together', body: 'A desktop interface brings inventory, skill inspection, local lint findings, and usage views together. The scanner distinguishes global, project, and plugin sources. A local index supports browsing without sending the indexed material to a model.' },
    { heading: 'Decisions that matter', body: 'Skill inspection is read-only. Existing plugin actions use the Claude CLI with scope and repository boundaries. This keeps product operations close to the tool that owns the installation rather than directly editing executable skill definitions.' },
    { heading: 'Boundaries and limitations', body: 'Marketplace indicators compare locally cached versions; they are not live marketplace checks. Usage costs are approximate API-equivalent estimates, not subscription bills. This case study is based on source review; desktop behavior has not been independently reproduced here.' },
  ] },
  { id: 'weatherscope', title: 'WeatherScope AI', category: 'Machine learning', summary: 'From weather observations to forecasting comparisons, explainability, and an exploratory dashboard.', stack: ['Python', 'scikit-learn', 'Streamlit'], source: 'https://github.com/vijaysai1102/WeatherScope-AI', sections: [
    { heading: 'The question', body: 'How much forecasting signal survives when weather observations are aggregated? The pipeline prepares the Global Weather Repository for comparison across temperature, humidity, and precipitation, with an exploratory Streamlit interface alongside the analysis.' },
    { heading: 'From observations to comparisons', body: 'The reviewed forecasting module constructs daily series, separates a holdout, runs statistical and tree-based models, and records predictions and metrics. The saved report describes rolling one-step-ahead evaluation over a 90-day window. These are global daily averages, not city-specific forecasts.' },
    { heading: 'What the saved report says', body: 'For global daily mean temperature, the saved report lists ARIMA MAE 0.249 °C, RMSE 0.321 °C and R² 0.936. The same report lists precipitation ARIMA R² 0.010 and negative R² for several alternatives. Weak precipitation results matter as much as the temperature result. These numbers were read from outputs/reports/REPORT.md; the pipeline was not rerun.' },
    { heading: 'Interpretation and limits', body: 'Aggregation can remove local signal and conceal regional variation. Model comparisons, explainability and the dashboard help interrogate the result, but do not establish operational forecast accuracy. Reported short-window temperature trends should not be interpreted as long-term climate conclusions.' },
  ] },
  { id: 'f1-rag', title: 'F1 Regulations RAG', category: 'Applied AI', summary: 'A document-retrieval assistant for exploring Formula 1 technical regulations with supporting context.', stack: ['Python', 'Gemini', 'ChromaDB'], source: 'https://github.com/vijaysai1102/2026_F1_Spec_RAG_Agent', sections: [
    { heading: 'Finding the relevant passage', body: 'A technical regulation is a difficult interface to a specific question. This project explores retrieval as a way to bring a smaller set of potentially relevant passages into the answering process, alongside terminal and Streamlit interfaces.' },
    { heading: 'The retrieval path', body: 'The reviewed ingestion script reads a local regulation PDF, splits it into overlapping chunks, embeds them with all-MiniLM-L6-v2, and stores them in Chroma. The query implementation retrieves ten similar chunks and supplies their text to Gemini. The ingestion script requires the local PDF; automatic downloading is not implemented there.' },
    { heading: 'Documents and current information', body: 'The answer prompt requests article references, with page references as a fallback. A separate up-to-date skill can supply web snippets and source URLs for current-information questions. Regulation evidence, live web evidence, and general model knowledge are different sources and should be identified separately.' },
    { heading: 'What the source review establishes', body: 'The implementation establishes a retrieve-then-generate flow, not a guarantee that every generated citation is correct. Its prompt allows labeled general knowledge when retrieved context is insufficient. No live regulatory answer was reproduced for this source review, so no technical rule or article citation is presented here as a verified answer.' },
  ] },
  { id: 'living-campus', title: 'Living Campus', category: 'Conversational AI', summary: 'A simulated campus where AI characters carry memories, changing relationships, and consequences from one conversation to the next.', stack: ['Python', 'Streamlit', 'Groq', 'SQLite'], source: 'https://github.com/vijaysai1102/Living-Campus', website: 'https://vijaysai1102-ai-npc-agent-app-fjs6j1.streamlit.app/', sections: [
    { heading: 'A conversation with a past', body: 'What changes when a character remembers more than the last message? Living Campus explores that question in a fictional Westbrook University, with a professor, a teaching assistant, and a student friend. Conversations take place inside a shared simulated world with character-specific memories, emotions, and relationships.' },
    { heading: 'From a message to a state change', body: 'The Streamlit chat loop assembles identity, current mood, relationship scores, relevant memories, campus context, and recent dialogue before calling Groq. Its structured response includes a reply, emotion and relationship changes, and memory information. Python modules normalize the response, bound the state values, and persist memories, chat history, and character state in SQLite. Memory selection combines importance, recency, memory type, and keyword overlap rather than simply replaying the latest messages.' },
    { heading: 'A campus that moves between conversations', body: 'A simulated clock and schedules determine who is available. Delayed, rule-based gossip lets shareable facts travel between characters without an extra model call. Authored JSON defines secrets, favors, and story arcs; the journal and semester recap reflect recorded state. Campus retrieval filters JSON context by character relevance and simulated week, then ranks keyword and tag matches. It is lightweight retrieval, not an embedding or vector-database pipeline.' },
    { heading: 'What this prototype establishes', body: 'The reviewed source connects generated dialogue to persistent state and authored simulation rules. It does not establish human-like emotions, reliable factual memory, measured engagement, or autonomous social behavior. SQLite state is keyed by character, so this review does not claim isolated multi-user accounts or production-scale persistence. The configured Groq model can be overridden; the legacy gemini_client.py filename does not mean this version uses Gemini. The app link resolved during review, but no live conversation, model quality benchmark, or full-semester playthrough was reproduced here.' },
  ] },
].map(parseProject);

export const getProject = (id: string) => projects.find(project => project.id === id);
export const additionalWork = [parseProject({
  id: 'pingback', title: 'PingBack', category: 'Developer tools',
  summary: 'Local notifications when Claude Code needs attention, with Windows and macOS platform adapters.',
  stack: ['TypeScript', 'CLI', 'Native notifications'], source: 'https://github.com/vijaysai1102/PingBack', sections: [],
})];
export const publicSources = [
  { id: 'profile', title: 'About Vijay', url: '/#about' },
  ...[...projects, ...additionalWork].map(project => ({ id: project.id, title: project.title, url: project.sections.length ? `/projects/${project.id}` : project.source })),
];
