'use client';
import { useId, useRef, useState } from 'react';
import { demoItems, demoViews, filterDemo, type DemoView } from '@/lib/demo';
import { Eyebrow } from './primitives';

function DemoSurface({ view, query, setView, setQuery }: { view: DemoView; query: string; setView: (view: DemoView) => void; setQuery: (query: string) => void }) {
  const searchId = useId();
  const items = filterDemo(demoItems[view], query);
  return <div className="demo-surface"><nav aria-label="Sample explorer views" className="demo-nav">{demoViews.map(item => <button key={item} type="button" aria-pressed={item === view} onClick={() => { setView(item); setQuery(''); }}>{item}</button>)}</nav><div className="demo-main"><div className="demo-title"><h3>{view === 'overview' ? 'A toolkit, brought together.' : view === 'skills' ? 'A small sample library.' : 'A clearer picture of usage.'}</h3><span>SAMPLE DATA</span></div><label htmlFor={searchId}>Search this sample view</label><input id={searchId} value={query} maxLength={100} onChange={event => setQuery(event.target.value)} placeholder="Try “project” or “usage”…" /><div className="demo-results" aria-live="polite">{items.length ? items.map(item => <article key={item.title} className="demo-item"><span className="demo-item-icon" aria-hidden="true">◈</span><div><h4>{item.title}</h4><p>{item.detail}</p></div><span className="demo-badge">{item.badge}</span></article>) : <div className="demo-empty"><p>No sample items match that search.</p><button onClick={() => setQuery('')}>Clear search</button></div>}</div></div></div>;
}
export function MegatronDemo() {
  const [view, setView] = useState<DemoView>('overview');
  const [query, setQuery] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const reset = () => { setView('overview'); setQuery(''); };
  const surface = <DemoSurface view={view} query={query} setView={setView} setQuery={setQuery} />;
  return <section id="demo" className="demo-section section rule"><Eyebrow>Explore / Megatron</Eyebrow><div className="section-heading"><h2>Get a feel for it.</h2><p>A bounded sample explorer. No local files, plugin changes, or real usage data.</p></div><div className="demo-toolbar"><span><span className="small-dot" /> Interactive sample</span><div><button onClick={reset}>Reset</button><button onClick={() => dialog.current?.showModal()}>Expand ↗</button></div></div>{surface}<p className="demo-footnote">This independent illustration is not the running desktop application. <a href="https://megatron-site.vercel.app/">Explore the product website ↗</a></p><dialog ref={dialog} className="demo-dialog" aria-labelledby={titleId}><div className="dialog-heading"><h2 id={titleId}>Megatron sample explorer</h2><button onClick={() => dialog.current?.close()}>Close ×</button></div>{surface}<div className="demo-toolbar"><span>Sample data only</span><button onClick={reset}>Reset sample</button></div></dialog></section>;
}
