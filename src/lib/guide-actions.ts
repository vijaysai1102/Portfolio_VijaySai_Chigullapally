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
export function actionsFromAnswer(answer: string): GuideAction[] {
  const ids = new Set([...answer.matchAll(/\[action:([a-z0-9-]+)\]/g)].map(match => match[1]));
  return [...ids].flatMap(id => { const action = guideAction(id); return action ? [action] : []; }).slice(0, 2);
}
export { displayGuideText } from './guide-display';
