import Image from 'next/image';
import { profile } from '@/content/portfolio';
import { ActionLink, Eyebrow } from './primitives';

export function Hero() {
  return <section id="home" className="hero">
    <div className="hero-copy"><Eyebrow>The personal studio of Vijay Sai</Eyebrow><h1>Good ideas.<br /><em>Thoughtfully<br className="desktop-break" /> built.</em></h1><p>A collection of software, experiments, and the thinking behind them. Take a look around.</p><div className="hero-actions"><ActionLink href="#work">Explore my work</ActionLink><a href="#about" className="text-link">The approach <span aria-hidden="true">↗</span></a></div><div className="hero-note"><span className="small-dot" /> Always something to explore.</div></div>
    <figure className="hero-figure" aria-label={profile.portrait ? profile.portrait.alt : 'An engineering studio diagram connecting interface, system, and evidence'}>
      <svg className="orbit-art" viewBox="0 0 480 480" aria-hidden="true"><defs><pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#b8c1ab" /></pattern></defs><circle cx="240" cy="240" r="227" fill="url(#dots)" opacity=".5" /><circle cx="240" cy="240" r="193" fill="none" stroke="#ccd1c0" /><circle cx="240" cy="240" r="145" fill="none" stroke="#ccd1c0" strokeDasharray="3 7" /><path d="M52 240h376M240 52v376" stroke="#d4d9ca" /><circle cx="240" cy="47" r="5" fill="#456436" /><circle cx="408" cy="335" r="5" fill="#456436" /><circle cx="73" cy="335" r="5" fill="#456436" /></svg>
      <div className="portrait-slot">{profile.portrait ? <Image src={profile.portrait.src} alt={profile.portrait.alt} width={260} height={310} priority /> : <div className="monogram" aria-hidden="true"><span>v<span className="monogram-dot">.</span></span><small>THINK / BUILD / REFINE</small></div>}</div>
      <span className="orbit-label label-interface"><span>01</span> Interface</span><span className="orbit-label label-system"><span>02</span> System</span><span className="orbit-label label-evidence"><span>03</span> Evidence</span><figcaption>A little curiosity. A lot of making.</figcaption>
    </figure>
    <div className="hero-bottom"><span>SOFTWARE & EXPLORATIONS</span><a href="#work" aria-label="Scroll to explore selected work">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
  </section>;
}
