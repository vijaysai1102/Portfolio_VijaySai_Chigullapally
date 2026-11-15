import { ActionLink, Eyebrow } from '@/components/primitives';
import { Hero } from '@/components/hero';
import { Work } from '@/components/work';
export default function Home() { return <main id="main" className="container"><Hero /><Work /><section id="about" className="section rule"><Eyebrow>02 / The approach</Eyebrow><h2>Curiosity, with<br /><em>a practical side.</em></h2><p>Understand the problem. Build a useful version. Check what actually works.</p></section><section id="contact" className="section rule"><Eyebrow>03 / Keep in touch</Eyebrow><h2>Letâ€™s make<br /><em>something useful.</em></h2><ActionLink href="https://github.com/vijaysai1102">Find me on GitHub</ActionLink></section></main>; }
