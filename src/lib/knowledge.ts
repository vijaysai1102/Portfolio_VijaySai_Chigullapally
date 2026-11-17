import { additionalWork, profile, projects } from '@/content/portfolio';
import { demoItems } from './demo';
export type Evidence = { id: string; title: string; url: string; text: string; reviewedAt: string };
const REVIEWED_AT = '2026-11-14';
const LIVING_CAMPUS_REVIEWED_AT = '2026-11-15';
const PROFILE_REVIEWED_AT = '2026-11-16';
const EDUCATION_QUERY = /\b(education|degrees?|university|college|gpa|master[’']?s?|graduat\w*)\b|\b(where|what|which)\b.*\b(vijay|he|his)\b.*\b(study|studied|attend\w*)\b/i;
const aliases: Record<string, string[]> = {
  megatron: ['megatron', 'skill', 'skills', 'plugin', 'plugins', 'usage', 'desktop'],
  weatherscope: ['weatherscope', 'weather', 'forecast', 'forecasting', 'temperature', 'precipitation'],
  'f1-rag': ['f1', 'formula', 'regulation', 'regulations', 'rag', 'retrieval'],
  'living-campus': ['living-campus', 'living', 'campus', 'npc', 'npcs', 'gossip', 'memories', 'emotions'],
  pingback: ['pingback', 'notification', 'notifications'],
};
export const knowledge: Evidence[] = [...projects, ...additionalWork].map(project => ({
  id: project.id, title: project.title,
  url: project.sections.length ? `/projects/${project.id}` : project.source,
  text: [project.summary, `Technologies: ${project.stack.join(', ')}.`, ...project.sections.map(section => `${section.heading}: ${section.body}`),
    ...(project.id === 'megatron' ? [`Portfolio sample explorer: This website includes an independent fictional Megatron illustration. It has Overview, Skills and Usage views and accesses no local files or real usage records. Its displayed sample items are ${JSON.stringify(demoItems)}.`] : []),
  ].join('\n'),
  reviewedAt: project.id === 'living-campus' ? LIVING_CAMPUS_REVIEWED_AT : REVIEWED_AT,
})).concat([{
  id: 'profile', title: 'About Vijay', url: '/#about', reviewedAt: PROFILE_REVIEWED_AT,
  text: [
    `Name: ${profile.name}. Public GitHub: ${profile.github}.`,
    ...profile.experience.map(entry => `${entry.title} at ${entry.organization}${entry.period ? ` (${entry.period})` : ''}: ${entry.description}`),
    ...profile.education.map(entry => `Education: ${entry.title}${entry.issuer ? `, ${entry.issuer}` : ''}${entry.date ? `, ${entry.date}` : ''}${entry.gpa ? `, GPA: ${entry.gpa}` : ''}.`),
    ...profile.certifications.map(entry => `Certification: ${entry.title}${entry.issuer ? `, ${entry.issuer}` : ''}${entry.date ? `, ${entry.date}` : ''}.`),
    ...(profile.email ? [`Public email: ${profile.email}.`] : []),
    ...(profile.resume ? [`Public resume: ${profile.resume}.`] : []),
  ].join('\n'),
}]);
export function selectEvidence(query: string, currentProject?: string): Evidence[] {
  const fictionalCampusContext = (currentProject === 'living-campus' || /\b(living[- ]campus|campus|npcs?)\b/i.test(query))
    && !/\b(vijay|his|he|attend\w*|graduat\w*|education|degree)\b/i.test(query);
  const missingTopics: [RegExp, boolean][] = [
    [/\b(contributions?|authorship|ownership)\b|\b(vijay|he)\b.*\b(alone|himself|sole|every part)\b|\bwho\b.*\b(owns?|built|wrote|created)\b/i, true],
    [/\b(experience|employ\w*|salary|hired|work history|career|companies|employers?|job titles?)\b|\bwhere\b.*\b(worked|working)\b/i, profile.experience.length === 0],
    [EDUCATION_QUERY, profile.education.length === 0 && !fictionalCampusContext],
    [/\b(certification|credential)\b/i, profile.certifications.length === 0],
    [/\bemail\b/i, !profile.email],
    [/\bresume\b/i, !profile.resume],
    [/\bportrait\b/i, !profile.portrait],
  ];
  if (missingTopics.some(([pattern, missing]) => missing && pattern.test(query))) return [];
  if (EDUCATION_QUERY.test(query) && !fictionalCampusContext) return knowledge.filter(entry => entry.id === 'profile');
  const words = new Set(query.toLowerCase().split(/[^a-z0-9-]+/));
  const namedProjects = knowledge.filter(entry => entry.id !== 'profile'
    && (words.has(entry.id) || words.has(entry.id.split('-')[0]) || query.toLowerCase().includes(entry.title.toLowerCase())));
  if (namedProjects.length) return namedProjects.slice(0, 3);
  if (/\b(name|github|contact|email|resume|education|degree|certifications?|experience|employment)\b/i.test(query)) return knowledge.filter(entry => entry.id === 'profile');
  const current = knowledge.find(entry => entry.id === currentProject);
  if (current) return [current];
  const scores = knowledge.map(entry => ({ entry, score: (aliases[entry.id] ?? []).filter(word => words.has(word)).length }));
  const matched = scores.filter(item => item.score > 0).sort((a, b) => b.score - a.score).map(item => item.entry);
  if (matched.length) return matched.slice(0, 3);
  if (/\b(projects?|work|portfolio|build|built)\b/i.test(query)) return knowledge.filter(entry => entry.id !== 'profile');
  if (/\bvijay\b/i.test(query)) return knowledge.filter(entry => entry.id === 'profile');
  return [];
}
