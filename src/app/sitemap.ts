import type { MetadataRoute } from 'next';
import { projects } from '@/content/portfolio';
import { siteConfig } from '@/lib/server/site';
export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteConfig();
  if (!site.origin || !site.indexable) return [];
  return ['/', ...projects.filter(project => project.sections.length).map(project => `/projects/${project.id}`)].map(path => ({ url: new URL(path, site.origin).href, lastModified: '2026-11-14', priority: path === '/' ? 1 : 0.7 }));
}
