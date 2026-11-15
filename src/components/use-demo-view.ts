'use client';
import { useSyncExternalStore } from 'react';
import { demoViewFromHash, type DemoView } from '@/lib/demo';
function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener);
  window.addEventListener('popstate', listener);
  return () => { window.removeEventListener('hashchange', listener); window.removeEventListener('popstate', listener); };
}
const snapshot = (): DemoView => demoViewFromHash(window.location.hash) ?? 'overview';
const serverSnapshot = (): DemoView => 'overview';
export function useDemoView(): DemoView { return useSyncExternalStore(subscribe, snapshot, serverSnapshot); }
export function setDemoView(view: DemoView) {
  const url = new URL(window.location.href);
  url.hash = `demo-${view}`;
  window.history.replaceState(window.history.state, '', url);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
}
