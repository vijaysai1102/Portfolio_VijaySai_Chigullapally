import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Guide } from '@/components/guide';
import { pageMetadata } from '@/lib/server/site';
const bodyFont = localFont({ src: '../assets/fonts/DM-Sans.woff2', variable: '--font-body', weight: '400 700', display: 'swap', adjustFontFallback: 'Arial' });
const headingFont = localFont({ src: '../assets/fonts/Manrope.woff2', variable: '--font-heading', weight: '400 800', display: 'swap', adjustFontFallback: 'Arial' });
export const metadata: Metadata = {
  ...pageMetadata('Vijay Sai Chigullapally — Portfolio', 'Selected software projects, experiments, and the thinking behind them. Explore Vijay Sai Chigullapally’s personal engineering studio.', '/'),
  title: { default: 'Vijay Sai Chigullapally — Portfolio', template: '%s — Vijay Sai Chigullapally' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}><body><Header />{children}<Footer /><Guide /></body></html>;
}
