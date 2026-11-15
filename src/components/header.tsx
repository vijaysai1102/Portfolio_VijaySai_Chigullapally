'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="container header-inner">
    <Link href="/#home" className="wordmark" aria-label="Vijay Sai — home">vijay<span>.</span></Link>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav aria-label="Main navigation" id="site-menu" className={`site-nav${open ? ' is-open' : ''}`}>
      <Link href="/#work" aria-current={pathname.startsWith('/projects') ? 'page' : undefined} onClick={() => setOpen(false)}>Work</Link>
      <Link href="/#about" onClick={() => setOpen(false)}>About</Link>
      <Link className="nav-contact" href="/#contact" onClick={() => setOpen(false)}>Let’s connect <span aria-hidden="true">↗</span></Link>
    </nav></div></header></>;
}
