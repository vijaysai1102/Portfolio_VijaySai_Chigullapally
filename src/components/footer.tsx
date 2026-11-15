import Link from 'next/link';
import { profile } from '@/content/portfolio';
export function Footer() {
  return <footer className="site-footer container"><div><Link className="wordmark" href="/#home" aria-label="Return home">vijay<span>.</span></Link><p>Curiosity. Craft. A little experimentation.</p></div><div className="footer-right"><a href={profile.github}>GitHub ↗</a><span>© {new Date().getFullYear()} {profile.name}</span></div></footer>;
}
