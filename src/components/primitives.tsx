import Link from 'next/link';
export function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="eyebrow">{children}</div>; }
export function Arrow({ direction = '↗' }: { direction?: string }) { return <span className="arrow" aria-hidden="true">{direction}</span>; }
export function ActionLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link className={`action${secondary ? ' secondary' : ''}`} href={href}>{children}<Arrow /></Link>;
}
export function Tags({ values }: { values: string[] }) { return <div className="tags">{values.map(value => <span className="tag" key={value}>{value}</span>)}</div>; }
