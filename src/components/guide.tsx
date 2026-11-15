'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { MAX_MESSAGE_CHARS } from '@/lib/chat-contract';
import { useGuide } from './use-guide';
import { useDemoView } from './use-demo-view';

export function Guide() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const healthRequest = useRef<AbortController | null>(null);
  const nearBottom = useRef(true);
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState<'checking' | 'online' | 'offline' | 'error'>('checking');
  const [draft, setDraft] = useState('');
  const guide = useGuide();
  const titleId = useId();
  const inputId = useId();
  const pathname = usePathname();
  const currentProject = /^\/projects\/(megatron|weatherscope|f1-rag)$/.exec(pathname)?.[1];
  const currentView = useDemoView();
  const context = { currentProject, ...(currentProject === 'megatron' ? { currentView } : {}) };
  const online = availability === 'online';
  const canSend = online && guide.remaining !== 0;
  useEffect(() => () => healthRequest.current?.abort(), []);
  useEffect(() => { if (nearBottom.current && log.current) log.current.scrollTop = log.current.scrollHeight; }, [guide.messages]);
  async function checkAvailability() {
    healthRequest.current?.abort();
    const controller = new AbortController(); healthRequest.current = controller;
    setAvailability('checking');
    try {
      const response = await fetch('/api/chat', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(5000)]), cache: 'no-store' });
      if (!response.ok) throw new Error('Guide unavailable');
      const status = await response.json();
      if (!controller.signal.aborted) setAvailability(status.available === true ? 'online' : 'offline');
    } catch { if (!controller.signal.aborted) setAvailability('error'); }
  }
  function launch() { dialog.current?.showModal(); setOpen(true); void checkAvailability(); }
  function close() { dialog.current?.close(); }
  function send(text = draft) {
    if (!canSend || guide.busy || !text.trim()) return;
    nearBottom.current = true;
    void guide.send(text, context);
    setDraft('');
  }
  return <><button className="guide-launcher" aria-haspopup="dialog" aria-expanded={open} onClick={launch}><span className="guide-symbol" aria-hidden="true">✳</span><span>Ask the guide</span><span aria-hidden="true">↗</span></button>
    <dialog ref={dialog} className="guide-dialog" aria-labelledby={titleId} onClose={() => { setOpen(false); healthRequest.current?.abort(); guide.stop(); }}>
      <header className="guide-header"><div className="guide-avatar" aria-hidden="true">✳</div><div><h2 id={titleId}>The studio guide</h2><span>Vijay’s AI portfolio guide</span></div><button className="guide-close" onClick={close} aria-label="Close guide">×</button></header>
      <div className="guide-status" role="status">{guide.busy ? 'Finding an answer in the portfolio…' : availability === 'checking' ? 'Checking guide availability…' : online ? 'Ready to explore the work.' : 'The AI guide is currently offline.'}</div>
      <div ref={log} className="guide-messages" role="log" aria-label="Portfolio conversation" aria-live="polite" aria-relevant="additions" onScroll={() => { if (log.current) nearBottom.current = log.current.scrollHeight - log.current.scrollTop - log.current.clientHeight < 80; }}>
        {!guide.messages.length && <div className="guide-welcome"><span aria-hidden="true">✳</span><h3>A different way<br />to look around.</h3><p>{online ? 'Ask about a project, a technical decision, or the evidence behind the work.' : 'Every project is still here to explore. Start with one of the links below.'}</p><div className="guide-quick-links"><Link href="/projects/megatron" onClick={close}>Megatron ↗</Link><Link href="/projects/weatherscope" onClick={close}>WeatherScope AI ↗</Link><Link href="/projects/f1-rag" onClick={close}>F1 Regulations RAG ↗</Link></div>{!online && availability !== 'checking' && <button className="guide-check" onClick={() => void checkAvailability()}>Check availability again</button>}</div>}
        {guide.messages.map(turn => <article key={turn.id} className={`guide-turn ${turn.role}`}><span>{turn.role === 'user' ? 'You' : 'Guide'}</span><p>{turn.text || 'Thinking…'}</p>{turn.sources.length > 0 && <nav aria-label="Answer sources">{turn.sources.map(source => <Link key={source.id} href={source.url} onClick={close}>{source.title} ↗</Link>)}</nav>}{turn.complete && turn.actions.length > 0 && <nav className="guide-actions" aria-label="Suggested navigation">{turn.actions.map(action => <Link key={action.id} href={action.href} onClick={event => { close(); if (pathname === '/projects/megatron' && action.id.startsWith('demo-')) { event.preventDefault(); window.location.hash = new URL(action.href, window.location.href).hash; } }}>{action.label} ↗</Link>)}</nav>}</article>)}
      </div>
      {guide.remaining !== null && <div className="guide-allowance" role="status">{guide.remaining ? `${guide.remaining} questions remain in this session.` : 'Session limit reached. Explore the project links or return later.'}</div>}
      {guide.error && <div className="guide-error" role="alert"><p>{guide.error}</p>{online && <button onClick={() => guide.retry(context)} disabled={guide.busy || !canSend}>Retry answer</button>}</div>}
      {online && !guide.messages.length && <div className="guide-prompts">{['Explain Megatron', 'What did WeatherScope find?'].map(prompt => <button key={prompt} onClick={() => send(prompt)}>{prompt} ↗</button>)}</div>}
      <form className="guide-form" onSubmit={event => { event.preventDefault(); send(); }}><label htmlFor={inputId} className="sr-only">Ask about the portfolio</label><textarea ref={input} id={inputId} maxLength={MAX_MESSAGE_CHARS} rows={2} disabled={!canSend} value={draft} onChange={event => setDraft(event.target.value)} placeholder={online ? 'What would you like to explore?' : 'The guide is currently offline.'} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send(); } }} /><div className="guide-form-actions"><button type="button" onClick={guide.reset} disabled={!guide.messages.length && !guide.busy}>Reset</button><span>{draft.length}/{MAX_MESSAGE_CHARS}</span>{guide.busy ? <button type="button" className="guide-send" onClick={guide.stop}>Stop ■</button> : <button type="submit" className="guide-send" disabled={!canSend || !draft.trim()}>Send ↗</button>}</div><p className="guide-privacy">Messages go to Google Gemini. This tab keeps the conversation until reset or reload.</p></form>
    </dialog></>;
}
