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
  { id: 'weatherscope', title: 'WeatherScope AI', category: 'Machine learning', summary: 'From weather observations to forecasting comparisons, explainability, and an exploratory dashboard.', stack: ['Python', 'scikit-learn', 'Streamlit'], source: 'https://github.com/vijaysai1102/WeatherScope-AI', sections: [
    { heading: 'The question', body: 'How much forecasting signal survives when weather observations are aggregated? The pipeline prepares the Global Weather Repository for comparison across temperature, humidity, and precipitation, with an exploratory Streamlit interface alongside the analysis.' },
    { heading: 'From observations to comparisons', body: 'The reviewed forecasting module constructs daily series, separates a holdout, runs statistical and tree-based models, and records predictions and metrics. The saved report describes rolling one-step-ahead evaluation over a 90-day window. These are global daily averages, not city-specific forecasts.' },
    { heading: 'What the saved report says', body: 'For global daily mean temperature, the saved report lists ARIMA MAE 0.249 °C, RMSE 0.321 °C and R² 0.936. The same report lists precipitation ARIMA R² 0.010 and negative R² for several alternatives. Weak precipitation results matter as much as the temperature result. These numbers were read from outputs/reports/REPORT.md; the pipeline was not rerun.' },
    { heading: 'Interpretation and limits', body: 'Aggregation can remove local signal and conceal regional variation. Model comparisons, explainability and the dashboard help interrogate the result, but do not establish operational forecast accuracy. Reported short-window temperature trends should not be interpreted as long-term climate conclusions. Personal contribution details are deferred.' },
  ] },
  { id: 'f1-rag', title: 'F1 Regulations RAG', category: 'Applied AI', summary: 'A document-retrieval assistant for exploring Formula 1 technical regulations with supporting context.', stack: ['Python', 'Gemini', 'ChromaDB'], source: 'https://github.com/vijaysai1102/2026_F1_Spec_RAG_Agent', sections: [
    { heading: 'Finding the relevant passage', body: 'A technical regulation is a difficult interface to a specific question. This project explores retrieval as a way to bring a smaller set of potentially relevant passages into the answering process, alongside terminal and Streamlit interfaces.' },
    { heading: 'The retrieval path', body: 'The reviewed ingestion script reads a local regulation PDF, splits it into overlapping chunks, embeds them with all-MiniLM-L6-v2, and stores them in Chroma. The query implementation retrieves ten similar chunks and supplies their text to Gemini. The ingestion script requires the local PDF; automatic downloading is not implemented there.' },
    { heading: 'Documents and current information', body: 'The answer prompt requests article references, with page references as a fallback. A separate up-to-date skill can supply web snippets and source URLs for current-information questions. Regulation evidence, live web evidence, and general model knowledge are different sources and should be identified separately.' },
    { heading: 'What the source review establishes', body: 'The implementation establishes a retrieve-then-generate flow, not a guarantee that every generated citation is correct. Its prompt allows labeled general knowledge when retrieved context is insufficient. No live regulatory answer was reproduced for this portfolio, so no technical rule or article citation is presented as a verified answer. A recorded evidence-backed example and personal contribution details remain to be supplied.' },
  ] },
].map(parseProject);

export const getProject = (id: string) => projects.find(project => project.id === id);
export const additionalWork = [parseProject({
  id: 'pingback', title: 'PingBack', category: 'Developer tools',
  summary: 'Local notifications when Claude Code needs attention, with Windows and macOS platform adapters.',
  stack: ['TypeScript', 'CLI', 'Native notifications'], source: 'https://github.com/vijaysai1102/PingBack', sections: [],
})];
