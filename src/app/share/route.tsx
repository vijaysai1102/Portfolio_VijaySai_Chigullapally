import { ImageResponse } from 'next/og';
import { profile } from '@/content/portfolio';
export const runtime = 'nodejs';
export const dynamic = 'force-static';
export function GET() {
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#f5f3ee', color: '#20221f', padding: '64px 72px' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, color: '#456436' }}><span style={{ fontSize: 38, fontWeight: 700 }}>vijay.</span><span>SOFTWARE / EXPERIMENTS / EXPLORATIONS</span></div><div style={{ display: 'flex', flexDirection: 'column', marginTop: 85 }}><span style={{ fontSize: 72, letterSpacing: '-3px' }}>Good ideas.</span><span style={{ fontSize: 72, letterSpacing: '-3px', color: '#456436' }}>Thoughtfully built.</span></div><div style={{ display: 'flex', marginTop: 'auto', borderTop: '1px solid #cdd3c1', paddingTop: 24, justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 29 }}>{profile.name}</span><span style={{ fontSize: 21, color: '#62665d' }}>The personal engineering studio ↗</span></div></div>, { width: 1200, height: 630 });
}
