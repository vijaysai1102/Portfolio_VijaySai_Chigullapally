import { additionalWork, profile, projects } from '@/content/portfolio';
export type Evidence = { id: string; title: string; url: string; text: string; reviewedAt: string };
const REVIEWED_AT = '2026-11-14';
const aliases: Record<string, string[]> = {
  megatron: ['megatron', 'skill', 'skills', 'plugin', 'plugins', 'usage', 'desktop'],
  weatherscope: ['weatherscope', 'weather', 'forecast', 'forecasting', 'temperature', 'precipitation'],
  'f1-rag': ['f1', 'formula', 'regulation', 'regulations', 'rag', 'retrieval'],
  pingback: ['pingback', 'notification', 'notifications'],
};
export const knowledge: Evidence[] = [...projects, ...additionalWork].map(project => ({
  id: project.id, title: project.title,
  url: project.sections.length ? `/projects/${project.id}` : project.source,
  text: [project.summary, `Technologies: ${project.stack.join(', ')}.`, ...project.sections.map(section => `${section.heading}: ${section.body}`)].join('\n'),
  reviewedAt: REVIEWED_AT,
}));
export function selectEvidence(query: string, currentProject?: string): Evidence[] {
  const missingTopics: [RegExp, boolean][] = [
    [/\b(experience|employ\w*|salary|hired|work history)\b/i, profile.experience.length === 0],
    [/\b(education|degree|university)\b/i, profile.education.length === 0],
    [/\b(certification|credential)\b/i, profile.certifications.length === 0],
    [/\b(email|resume|portrait)\b/i, !profile.email && !profile.resume && !profile.portrait],
  ];
  if (missingTopics.some(([pattern, missing]) => missing && pattern.test(query))) return [];
  const words = new Set(query.toLowerCase().split(/[^a-z0-9-]+/));
  const scores = knowledge.map(entry => ({ entry, score: (aliases[entry.id] ?? []).filter(word => words.has(word)).length }));
  const matched = scores.filter(item => item.score > 0).sort((a, b) => b.score - a.score).map(item => item.entry);
  if (matched.length) return matched.slice(0, 3);
  const current = knowledge.find(entry => entry.id === currentProject);
  if (current) return [current];
  if (/\b(projects?|work|portfolio|build|built)\b/i.test(query)) return knowledge.slice(0, 3);
  return [];
}
