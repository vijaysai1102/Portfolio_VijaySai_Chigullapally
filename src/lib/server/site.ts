import type { Metadata } from 'next';

const CONFIRMED_PRODUCTION_ORIGIN = 'https://vijayportfolio-eight.vercel.app';

export function siteConfig(environment: Record<string, string | undefined> = process.env): { origin?: string; indexable: boolean } {
  const supplied = environment.SITE_URL || (environment.VERCEL_ENV === 'production' ? CONFIRMED_PRODUCTION_ORIGIN : undefined);
  if (!supplied) return { indexable: false };
  let url: URL;
  try { url = new URL(supplied); } catch { throw new Error('SITE_URL must be a valid HTTPS origin'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('SITE_URL must be a public HTTPS origin without a path or credentials');
  const indexable = environment.VERCEL_ENV === 'production' || (!environment.VERCEL_ENV && environment.SITE_INDEXABLE === 'true');
  return { origin: url.origin, indexable };
}
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const site = siteConfig();
  const url = site.origin ? new URL(path, site.origin).href : undefined;
  const image = site.origin ? `${site.origin}/share` : undefined;
  return {
    title, description, metadataBase: site.origin ? new URL(site.origin) : undefined,
    robots: { index: site.indexable, follow: site.indexable },
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { title, description, type: 'website', siteName: 'Vijay Sai Chigullapally', locale: 'en_US', ...(url ? { url } : {}), ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: 'Vijay Sai Chigullapally — engineering studio' }] } : {}) },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, ...(image ? { images: [image] } : {}) },
  };
}
