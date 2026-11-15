import { ActionLink, Eyebrow } from '@/components/primitives';
import { Hero } from '@/components/hero';
import { Work } from '@/components/work';
import { About } from '@/components/about';
export default function Home() { return <main id="main" className="container"><Hero /><Work /><About /><section id="contact" className="section rule"><Eyebrow>03 / Keep in touch</Eyebrow><h2>LetÃ¢â‚¬â„¢s make<br /><em>something useful.</em></h2><ActionLink href="https://github.com/vijaysai1102">Find me on GitHub</ActionLink></section></main>; }
