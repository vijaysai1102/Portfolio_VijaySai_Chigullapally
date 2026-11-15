import { publicUrl, type Credential } from '@/content/model';
export function CredentialSection({ title, entries }: { title: string; entries: Credential[] }) {
  if (!entries.length) return null;
  return <section className="credential-section"><h3>{title}</h3>{entries.map((entry, index) => <article className="credential-entry" key={`${entry.title}-${index}`}><h4>{entry.url ? <a href={publicUrl(entry.url)}>{entry.title} ↗</a> : entry.title}</h4>{entry.issuer && <p>{entry.issuer}</p>}{entry.date && <small>{entry.date}</small>}</article>)}</section>;
}
