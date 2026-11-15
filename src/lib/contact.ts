import { publicUrl } from '@/content/model';
export function emailHref(value: string): string {
  const email = value.trim();
  if (!/^[^\s@?%]+@[^\s@?%]+\.[^\s@?%]+$/.test(email)) throw new Error('A valid email without header parameters is required');
  return `mailto:${encodeURIComponent(email).replace('%40', '@')}`;
}
export function resumeHref(value: string): string {
  if (value.startsWith('https://')) return publicUrl(value);
  if (!/^\/(?!\/)(?!.*\.\.)[a-zA-Z0-9/_-]+\.pdf$/.test(value)) throw new Error('Resume must be a public PDF path or HTTPS URL');
  return value;
}
