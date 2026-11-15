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
})).concat([{
  id: 'profile', title: 'About Vijay', url: '/#about', reviewedAt: REVIEWED_AT,
  text: [
    `Name: ${profile.name}. Public GitHub: ${profile.github}.`,
    ...profile.experience.map(entry => `${entry.title} at ${entry.organization}${entry.period ? ` (${entry.period})` : ''}: ${entry.description}`),
    ...profile.education.map(entry => `Education: ${entry.title}${entry.issuer ? `, ${entry.issuer}` : ''}${entry.date ? `, ${entry.date}` : ''}.`),
    ...profile.certifications.map(entry => `Certification: ${entry.title}${entry.issuer ? `, ${entry.issuer}` : ''}${entry.date ? `, ${entry.date}` : ''}.`),
    ...(profile.email ? [`Public email: ${profile.email}.`] : []),
    ...(profile.resume ? [`Public resume: ${profile.resume}.`] : []),
  ].join('\n'),
}]);
export function selectEvidence(query: string, currentProject?: string): Evidence[] {
  const missingTopics: [RegExp, boolean][] = [
    [/\b(experience|employ\w*|salary|hired|work history|career|companies|employers?|job titles?)\b|\bwhere\b.*\b(worked|working)\b/i, profile.experience.length === 0],
    [/\b(education|degree|university)\b/i, profile.education.length === 0],
    [/\b(certification|credential)\b/i, profile.certifications.length === 0],
    [/\bemail\b/i, !profile.email],
    [/\bresume\b/i, !profile.resume],
    [/\bportrait\b/i, !profile.portrait],
  ];
  if (missingTopics.some(([pattern, missing]) => missing && pattern.test(query))) return [];
  const words = new Set(query.toLowerCase().split(/[^a-z0-9-]+/));
  const scores = knowledge.map(entry => ({ entry, score: (aliases[entry.id] ?? []).filter(word => words.has(word)).length }));
  const matched = scores.filter(item => item.score > 0).sort((a, b) => b.score - a.score).map(item => item.entry);
  if (matched.length) return matched.slice(0, 3);
  if (/\b(name|github|contact|email|resume|education|degree|certifications?|experience|employment)\b/i.test(query)) return knowledge.filter(entry => entry.id === 'profile');
  const current = knowledge.find(entry => entry.id === currentProject);
  if (current) return [current];
  if (/\b(projects?|work|portfolio|build|built)\b/i.test(query)) return knowledge.slice(0, 3);
  if (/\bvijay\b/i.test(query)) return knowledge.filter(entry => entry.id === 'profile');
  return [];
}
