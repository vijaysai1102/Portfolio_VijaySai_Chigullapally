import Link from 'next/link';
import { projects } from '@/content/portfolio';
import { Arrow, Eyebrow, Tags } from './primitives';
import { ProjectArt } from './project-art';
import { AdditionalWork } from './additional-work';

export function Work() {
  return <section id="work" className="section rule"><Eyebrow>01 / Selected work</Eyebrow><div className="section-heading"><h2>From a question<br />to something you can use.</h2><p>Different problems. A shared interest in making the details work.</p></div><div className="projects-grid">{projects.map((project, index) => <Link id={`project-${project.id}`} key={project.id} href={project.sections.length ? `/projects/${project.id}` : project.source} className={`project-card${index === 0 ? ' flagship' : ''}`}><div className="project-copy"><span className="project-category">{index === 0 ? 'FEATURED PROJECT / ' : ''}{project.category}</span><h3>{project.title}<Arrow /></h3><p>{project.summary}</p><Tags values={project.stack} /><span className="project-cta">{project.sections.length ? 'Explore the case study' : 'Explore the source'} <Arrow /></span></div><ProjectArt id={project.id} /></Link>)}</div><AdditionalWork /></section>;
}
