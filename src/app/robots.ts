import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/server/site';
export default function robots(): MetadataRoute.Robots {
  const site = siteConfig();
  return { rules: site.indexable ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' }, ...(site.indexable && site.origin ? { sitemap: `${site.origin}/sitemap.xml` } : {}) };
}
