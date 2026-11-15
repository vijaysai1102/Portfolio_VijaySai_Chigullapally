import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Guide } from '@/components/guide';
import { pageMetadata } from '@/lib/server/site';
export const metadata: Metadata = {
  ...pageMetadata('Vijay Sai Chigullapally — Portfolio', 'Selected software projects, experiments, and the thinking behind them. Explore Vijay Sai Chigullapally’s personal engineering studio.', '/'),
  title: { default: 'Vijay Sai Chigullapally — Portfolio', template: '%s — Vijay Sai Chigullapally' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<Footer /><Guide /></body></html>;
}
