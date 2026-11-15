import { publicUrl, type Experience } from '@/content/model';
export function ExperienceSection({ entries }: { entries: Experience[] }) {
  if (!entries.length) return null;
  return <section id="experience" className="profile-section"><h3>Experience</h3><div className="timeline">{entries.map((entry, index) => <article className="timeline-entry" key={`${entry.organization}-${entry.title}-${index}`}><div><h4>{entry.title}</h4>{entry.url ? <a href={publicUrl(entry.url)}>{entry.organization} ↗</a> : <span>{entry.organization}</span>}{entry.period && <small>{entry.period}</small>}</div><p>{entry.description}</p></article>)}</div></section>;
}
