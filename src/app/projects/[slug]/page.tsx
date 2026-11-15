import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/content/portfolio';
import { ActionLink, Arrow, Eyebrow, Tags } from '@/components/primitives';
import { ProjectArt } from '@/components/project-art';
import { MegatronDemo } from '@/components/megatron-demo';
import { pageMetadata } from '@/lib/server/site';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.filter(project => project.sections.length).map(project => ({ slug: project.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? pageMetadata(project.title, project.summary, `/projects/${project.id}`) : {};
}
export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project || !project.sections.length) notFound();
  const related = projects.filter(item => item.id !== project.id);
  return <main id="main" className="container case-page">
    <Link href="/#work" className="text-link case-back"><Arrow direction="←" /> All work</Link>
    <header className="case-heading"><Eyebrow>{project.category} / A closer look</Eyebrow><h1>{project.title}</h1><p>{project.summary}</p><div className="case-actions"><ActionLink href={project.source}>View the source</ActionLink>{project.id === 'megatron' && <a className="text-link" href="https://megatron-site.vercel.app/">Product website <Arrow /></a>}</div><Tags values={project.stack} /></header>
    <div className={`case-art case-art-${project.id}`}><ProjectArt id={project.id} /></div>
    {project.id === 'weatherscope' && <p className="artifact-link"><a href="https://github.com/vijaysai1102/WeatherScope-AI/blob/master/outputs/reports/REPORT.md">Read the saved evaluation report ↗</a><span>Global daily means · 90-day holdout · source-reported, not reproduced</span></p>}
    <div className="case-body"><aside className="case-index"><span className="project-category">IN THIS PROJECT</span><nav aria-label="Case study contents">{project.sections.map((section, index) => <a key={section.heading} href={`#section-${index}`}>{String(index + 1).padStart(2, '0')} &nbsp; {section.heading}</a>)}</nav><a className="text-link" href={project.source}>Repository <Arrow /></a></aside><article>{project.sections.map((section, index) => <section key={section.heading} id={`section-${index}`} className="case-section"><span className="case-number">{String(index + 1).padStart(2, '0')}</span><h2>{section.heading}</h2><p>{section.body}</p></section>)}<div className="evidence-note"><strong>About the evidence</strong><p>This case study describes reviewed source material. Reported results and implementation details have not been independently reproduced here.</p><a href={project.source}>Inspect the project source ↗</a></div></article></div>
    {project.id === 'megatron' && <MegatronDemo />}
    <section className="case-related section rule"><Eyebrow>Keep exploring</Eyebrow><div className="related-grid">{related.map(item => <Link className="related-item" key={item.id} href={item.sections.length ? `/projects/${item.id}` : item.source}><span>{item.category}</span><h3>{item.title}<Arrow /></h3></Link>)}</div><Link className="text-link" href="/#contact">Get in touch <Arrow /></Link></section>
  </main>;
}
