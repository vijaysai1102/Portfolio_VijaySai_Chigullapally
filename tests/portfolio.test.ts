import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseProject } from '../src/content/model';
import { profile, projects } from '../src/content/portfolio';
import { filterDemo, isDemoView } from '../src/lib/demo';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ExperienceSection } from '../src/components/experience';
import { CredentialSection } from '../src/components/credentials';
test('credentials render titles without inventing optional issuer/date/links', () => {
  assert.equal(renderToStaticMarkup(createElement(CredentialSection, { title: 'Education', entries: [] })), '');
  const html = renderToStaticMarkup(createElement(CredentialSection, { title: 'Certifications', entries: [{ title: 'Synthetic long credential title for development only' }] }));
  assert.match(html, /Synthetic long credential title/);
  assert.equal(html.includes('href='), false);
});
test('experience omits empty data and renders a future supplied entry', () => {
  assert.equal(renderToStaticMarkup(createElement(ExperienceSection, { entries: [] })), '');
  const fixture = { organization: 'Synthetic fixture organization', title: 'Fixture role', description: 'Development-only example.' };
  assert.match(renderToStaticMarkup(createElement(ExperienceSection, { entries: [fixture] })), /Synthetic fixture organization/);
});
test('demo selection rejects unknown views and search has a deterministic empty state', () => {
  assert.equal(isDemoView('https://outside.example'), false);
  assert.equal(isDemoView('skills'), true);
  const items = [{ title: 'Review', detail: 'Inspect changes', badge: 'Local' }];
  assert.deepEqual(filterDemo(items, '  INSPECT '), items);
  assert.deepEqual(filterDemo(items, 'missing'), []);
});
const validProject = { id: 'test-project', title: 'A project', category: 'Tools', summary: 'A useful system', stack: ['TypeScript'], source: 'https://example.com/project', sections: [] };
test('content rejects malformed IDs, missing fields and unsafe destinations', () => {
  assert.throws(() => parseProject({ ...validProject, id: '../outside' }), /id/i);
  assert.throws(() => parseProject({ ...validProject, title: '' }), /title/i);
  assert.throws(() => parseProject({ ...validProject, source: 'javascript:alert(1)' }), /https/i);
  assert.throws(() => parseProject({ ...validProject, source: 'https://user:pass@example.com' }), /credentials/i);
});
test('public projection excludes private notes and keeps empty sections valid', () => {
  assert.deepEqual(parseProject({ ...validProject, privateNotes: 'never publish' }), validProject);
});
test('published profile contains no inferred employment and stable unique project IDs', () => {
  assert.deepEqual(profile.experience, []);
  assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
});
test('client environment example never exposes a public provider key', () => {
  const environment = readFileSync('.env.example', 'utf8');
  assert.equal(environment.includes('NEXT_PUBLIC_GEMINI'), false);
});
