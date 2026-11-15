export const demoViews = ['overview', 'skills', 'usage'] as const;
export type DemoView = typeof demoViews[number];
export type DemoItem = { title: string; detail: string; badge: string };
export function isDemoView(value: unknown): value is DemoView { return demoViews.some(view => view === value); }
export function filterDemo(items: DemoItem[], query: string): DemoItem[] {
  const search = query.trim().toLowerCase();
  return items.filter(item => `${item.title} ${item.detail}`.toLowerCase().includes(search));
}
export const demoItems: Record<DemoView, DemoItem[]> = {
  overview: [
    { title: 'Bring your toolkit into focus', detail: 'Explore a sample inventory without accessing any local files.', badge: 'Overview' },
    { title: 'Inspect before you act', detail: 'The real product separates read-only skill inspection from scoped plugin operations.', badge: 'Boundaries' },
    { title: 'Follow the evidence', detail: 'Usage summaries help explain activity; estimated API cost is not a subscription invoice.', badge: 'Usage' },
  ],
  skills: [
    { title: 'Code review', detail: 'A fictional local skill for inspecting a proposed change.', badge: 'Global' },
    { title: 'Project planning', detail: 'A fictional repository skill for turning a question into a plan.', badge: 'Project' },
    { title: 'Visual verification', detail: 'A fictional plugin skill for checking an interface.', badge: 'Plugin' },
  ],
  usage: [
    { title: 'Activity', detail: 'Sample view: prompts and sessions grouped by time.', badge: 'Illustrative' },
    { title: 'Skill invocations', detail: 'Sample view: how a skill was triggered within a session.', badge: 'Illustrative' },
    { title: 'Estimated API-equivalent cost', detail: 'Approximate allocation, never represented as an actual bill.', badge: 'Illustrative' },
  ],
};
