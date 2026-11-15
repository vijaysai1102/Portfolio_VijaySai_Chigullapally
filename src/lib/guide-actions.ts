import { additionalWork, projects } from '@/content/portfolio';
import { demoViews } from './demo';
export type GuideAction = Readonly<{ id: string; label: string; href: string }>;
export const guideActions: readonly GuideAction[] = [
  { id: 'work', label: 'Explore all work', href: '/#work' },
  { id: 'about', label: 'Explore the approach', href: '/#about' },
  { id: 'contact', label: 'Open contact links', href: '/#contact' },
  ...projects.flatMap(project => [
    { id: project.id, label: `Open ${project.title}`, href: `/projects/${project.id}` },
    { id: `highlight-${project.id}`, label: `Highlight ${project.title}`, href: `/#project-${project.id}` },
  ]),
  ...additionalWork.map(project => ({ id: project.id, label: `View ${project.title} source`, href: project.source })),
  ...demoViews.map(view => ({ id: `demo-${view}`, label: `Explore sample ${view}`, href: `/projects/megatron#demo-${view}` })),
];
export function guideAction(id: unknown): GuideAction | undefined { return guideActions.find(action => action.id === id); }
export function actionsFromAnswer(answer: string, question = '', currentProject?: string): GuideAction[] {
  const requested = requestedActions(question, currentProject);
  if (requested) return requested;
  const ids = new Set([...answer.matchAll(/\[action:([a-z0-9-]+)\]/g)].map(match => match[1]));
  return registeredActions(ids);
}
function registeredActions(ids: Iterable<string>): GuideAction[] {
  return [...ids].flatMap(id => { const action = guideAction(id); return action ? [action] : []; }).slice(0, 2);
}
function requestedActions(question: string, currentProject?: string): GuideAction[] | undefined {
  if (/\b(do not|don't|never)\s+(open|show|highlight|explore|navigate|go|take)\b/i.test(question)) return [];
  const request = question.trim().replace(/^(?:(?:please|can you|could you|would you|i want to|i'd like to)\s+)+/i, '');
  if (!/^(open|show|highlight|explore|navigate|go|take me)\b/i.test(request)) return undefined;
  const lower = request.toLowerCase();
  const words = new Set(lower.split(/[^a-z0-9-]+/));
  const project = [...projects, ...additionalWork].find(entry => words.has(entry.id) || words.has(entry.id.split('-')[0]) || lower.includes(entry.title.toLowerCase()));
  const views = demoViews.filter(view => words.has(view));
  const sampleRequested = project?.id === 'megatron' || (!project && (currentProject === 'megatron' || words.has('sample') || words.has('demo')));
  if (views.length && sampleRequested) return registeredActions(views.map(view => `demo-${view}`));
  if (project) return registeredActions([words.has('highlight') ? `highlight-${project.id}` : project.id]);
  if (words.has('work') || words.has('projects')) return registeredActions(['work']);
  if (words.has('contact') || words.has('connect')) return registeredActions(['contact']);
  return undefined;
}
export { displayGuideText } from './guide-display';
