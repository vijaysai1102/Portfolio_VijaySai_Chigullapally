import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseProject } from '../src/content/model';
import { profile, projects } from '../src/content/portfolio';
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
