import type { SourceReference } from './grounding';
import { additionalWork, projects } from '@/content/portfolio';
import { guideAction, type GuideAction } from './guide-actions';
export type GuideEvent = { type: 'token'; text: string } | { type: 'sources'; sources: SourceReference[] } | { type: 'actions'; actions: GuideAction[] } | { type: 'limit'; remainingSession: number } | { type: 'done' };
function decodeEvent(line: string): GuideEvent | undefined {
  let value;
  try { value = JSON.parse(line); } catch { throw new Error('The guide returned an unreadable response.'); }
  if (!value || typeof value !== 'object') throw new Error('The guide response is invalid.');
  if (value.type === 'error') throw new Error(typeof value.message === 'string' ? value.message.slice(0, 300) : 'The guide could not answer.');
  if (value.type === 'token' && typeof value.text === 'string' && value.text.length <= 6000) return { type: 'token', text: value.text };
  if (value.type === 'sources' && Array.isArray(value.sources)) {
    const sources = value.sources.slice(0, 3).flatMap((source: { id?: unknown }) => {
      const project = [...projects, ...additionalWork].find(project => project.id === source?.id);
      return project ? [{ id: project.id, title: project.title, url: project.sections.length ? `/projects/${project.id}` : project.source }] : [];
    });
    return { type: 'sources', sources };
  }
  if (value.type === 'done') return { type: 'done' };
  if (value.type === 'limit' && Number.isSafeInteger(value.remainingSession) && value.remainingSession >= 0) return { type: 'limit', remainingSession: value.remainingSession };
  if (value.type === 'actions' && Array.isArray(value.actions)) return { type: 'actions', actions: value.actions.slice(0, 2).flatMap((item: { id?: unknown }) => { const action = guideAction(item?.id); return action ? [action] : []; }) };
  if (value.type === 'usage') return undefined;
  throw new Error('The guide returned an unsupported response.');
}
export async function* readGuideStream(body: ReadableStream<Uint8Array>): AsyncGenerator<GuideEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let received = 0;
  let textLength = 0;
  let done = false;
  try {
    while (!done) {
      const chunk = await reader.read();
      buffer += chunk.done ? decoder.decode() : decoder.decode(chunk.value, { stream: true });
      received += chunk.value?.byteLength ?? 0;
      if (received > 256000 || buffer.length > 65536) throw new Error('The guide response exceeded its limit.');
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      if (chunk.done && buffer.trim()) { lines.push(buffer); buffer = ''; }
      for (const line of lines) {
        if (!line.trim()) continue;
        const event = decodeEvent(line);
        if (event?.type === 'token') { textLength += event.text.length; if (textLength > 6000) throw new Error('The answer exceeded its limit.'); }
        if (event) yield event;
        if (event?.type === 'done') { done = true; break; }
      }
      if (chunk.done) break;
    }
    if (!done) throw new Error('The connection ended before the answer was complete. Please retry.');
  } finally { await reader.cancel(); reader.releaseLock(); }
}
