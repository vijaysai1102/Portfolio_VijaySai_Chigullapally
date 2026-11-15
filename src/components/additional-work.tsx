import { additionalWork } from '@/content/portfolio';
import { Arrow } from './primitives';
export function AdditionalWork() {
  if (!additionalWork.length) return null;
  return <div className="additional-work" id="more-work"><div className="additional-heading"><span className="project-category">ALSO ON THE WORKBENCH</span><span>A few more things worth exploring.</span></div>{additionalWork.map(project => <a className="additional-item" href={project.source} key={project.id}><span className="additional-icon" aria-hidden="true">↳</span><div><h3>{project.title}</h3><p>{project.summary}</p></div><span className="additional-category">{project.category}</span><Arrow /></a>)}</div>;
}
