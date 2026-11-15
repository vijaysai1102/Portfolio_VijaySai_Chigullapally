export type Project = {
  id: string; title: string; category: string; summary: string;
  stack: string[]; source: string; sections: { heading: string; body: string }[];
};
export type Experience = { organization: string; title: string; period?: string; description: string; url?: string };
export type Credential = { title: string; issuer?: string; date?: string; url?: string };
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Content must be an object');
  return value as Record<string, unknown>;
}
function text(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} is required`);
  return value.trim();
}
export function publicUrl(value: unknown): string {
  const source = text(value, 'HTTPS URL');
  let url: URL;
  try { url = new URL(source); } catch { throw new Error('A valid HTTPS URL is required'); }
  if (url.protocol !== 'https:') throw new Error('Only HTTPS URLs are allowed');
  if (url.username || url.password) throw new Error('URL credentials are not allowed');
  return url.href;
}
export function parseProject(value: unknown): Project {
  const input = record(value);
  const id = text(input.id, 'id');
  if (!/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(id)) throw new Error('Invalid project id');
  if (!Array.isArray(input.stack)) throw new Error('stack must be an array');
  if (!Array.isArray(input.sections)) throw new Error('sections must be an array');
  return {
    id, title: text(input.title, 'title'), category: text(input.category, 'category'),
    summary: text(input.summary, 'summary'), source: publicUrl(input.source),
    stack: input.stack.map(item => text(item, 'stack item')),
    sections: input.sections.map(item => {
      const section = record(item);
      return { heading: text(section.heading, 'heading'), body: text(section.body, 'body') };
    }),
  };
}
