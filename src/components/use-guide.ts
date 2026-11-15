'use client';
import { useEffect, useRef, useState } from 'react';
import { MAX_MESSAGE_CHARS, type ChatMessage, type ChatRequest } from '@/lib/chat-contract';
import { conversationInput } from '@/lib/conversation';
import { readGuideStream } from '@/lib/guide-stream';
import type { SourceReference } from '@/lib/grounding';
import { displayGuideText, type GuideAction } from '@/lib/guide-actions';
export type GuideTurn = ChatMessage & { id: string; complete: boolean; sources: SourceReference[]; actions: GuideAction[] };
const MAX_VISIBLE_TURNS = 24;
type GuideContext = Pick<ChatRequest, 'currentProject' | 'currentView'>;

export function useGuide() {
  const [messages, setMessages] = useState<GuideTurn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const history = useRef<GuideTurn[]>([]);
  const active = useRef<AbortController | null>(null);
  const version = useRef(0);
  const lastAttempt = useRef<{ text: string; history: GuideTurn[] } | null>(null);
  const commit = (next: GuideTurn[]) => { history.current = next; setMessages(next); };
  useEffect(() => () => active.current?.abort(), []);

  async function run(value: string, context: GuideContext = {}, base = history.current.filter(turn => turn.complete)) {
    if (active.current) return;
    const text = value.trim();
    if (!text || text.length > MAX_MESSAGE_CHARS) { setError('Please enter a question of up to 2,000 characters.'); return; }
    const input = conversationInput([...base.map(({ role, text }) => ({ role, text })), { role: 'user', text }], context.currentProject, context.currentView);
    const requestVersion = ++version.current;
    const controller = new AbortController();
    active.current = controller;
    lastAttempt.current = { text, history: base };
    const userId = crypto.randomUUID();
    const answerId = crypto.randomUUID();
    commit([...base, { id: userId, role: 'user', text, complete: true, sources: [], actions: [] }, { id: answerId, role: 'assistant', text: '', complete: false, sources: [], actions: [] }].slice(-MAX_VISIBLE_TURNS) as GuideTurn[]);
    setBusy(true); setError(null);
    const updateAnswer = (change: Partial<GuideTurn>) => commit(history.current.map(turn => turn.id === answerId ? { ...turn, ...change } : turn));
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input), signal: controller.signal });
      if (!response.ok) {
        const failure = await response.json();
        throw new Error(typeof failure.error === 'string' ? failure.error : 'The guide is unavailable.');
      }
      if (!response.body) throw new Error('The guide connection is unavailable.');
      let answer = '';
      for await (const event of readGuideStream(response.body)) {
        if (requestVersion !== version.current) return;
        if (event.type === 'token') { answer += event.text; updateAnswer({ text: displayGuideText(answer) }); }
        if (event.type === 'sources') updateAnswer({ sources: event.sources });
        if (event.type === 'actions') updateAnswer({ actions: event.actions });
        if (event.type === 'limit') setRemaining(event.remainingSession);
        if (event.type === 'done') updateAnswer({ complete: true });
      }
    } catch (failure) {
      if (requestVersion !== version.current) return;
      commit(history.current.filter(turn => turn.id !== answerId));
      setError(controller.signal.aborted ? 'Response stopped.' : failure instanceof Error ? failure.message : 'The guide is unavailable.');
    } finally {
      if (requestVersion === version.current) { active.current = null; setBusy(false); }
    }
  }
  function stop() {
    if (!active.current) return;
    active.current.abort(); active.current = null; version.current++;
    commit(history.current.filter(turn => turn.complete));
    setBusy(false); setError('Response stopped. You can retry or ask another question.');
  }
  function reset() { stop(); version.current++; commit([]); lastAttempt.current = null; setError(null); }
  function retry(context: GuideContext = {}) {
    const attempt = lastAttempt.current;
    if (attempt) void run(attempt.text, context, attempt.history);
  }
  return { messages, busy, error, remaining, send: run, stop, reset, retry };
}
