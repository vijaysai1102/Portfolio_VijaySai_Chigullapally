import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseProject } from '../src/content/model';
import { profile, projects } from '../src/content/portfolio';
import { demoViewFromHash, filterDemo, isDemoView } from '../src/lib/demo';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ExperienceSection } from '../src/components/experience';
import { CredentialSection } from '../src/components/credentials';
import { emailHref, resumeHref } from '../src/lib/contact';
import { selectEvidence } from '../src/lib/knowledge';
import { parseChatRequest } from '../src/lib/chat-contract';
import { streamGemini } from '../src/lib/server/gemini';
import { readChatRequest } from '../src/lib/server/request';
import { answerPlan, citedSources } from '../src/lib/grounding';
import { conversationInput } from '../src/lib/conversation';
import { readGuideStream } from '../src/lib/guide-stream';
import { actionsFromAnswer, displayGuideText, guideAction } from '../src/lib/guide-actions';
import { reserveUsage, usageConfig } from '../src/lib/server/usage';
test('release configuration requires explicit budgets and malformed quota results fail closed', async () => {
  assert.throws(() => usageConfig({}), /configured/i);
  assert.throws(() => usageConfig({ UPSTASH_REDIS_REST_URL: 'https://quota.example', UPSTASH_REDIS_REST_TOKEN: 'test-token', AI_DAILY_REQUEST_LIMIT: '5', AI_SESSION_REQUEST_LIMIT: '3' }), /limits/i);
  await assert.rejects(() => reserveUsage({ url: 'https://quota.example', token: 'test-token', daily: 5, monthly: 10, session: 3 }, '12345678-1234-4123-8123-123456789012', async () => Response.json({ result: [1, 6, 8, 2] })), /invalid/i);
});
test('provider handles fragmented CRLF/Unicode and safety rejection', async () => {
  const input = { apiKey: 'test-key', model: 'test-model', system: 'Test system', messages: [{ role: 'user' as const, text: 'Hello' }] };
  const bytes = new TextEncoder().encode('data: {"candidates":[{"content":{"parts":[{"text":"Café"}]}}]}\r\n\r\n');
  const body = new ReadableStream<Uint8Array>({ start(controller) { for (const byte of bytes) controller.enqueue(new Uint8Array([byte])); controller.close(); } });
  const events = [];
  for await (const event of streamGemini(input, async () => new Response(body))) events.push(event);
  assert.deepEqual(events, [{ type: 'token', text: 'Café' }]);
  await assert.rejects(async () => { for await (const event of streamGemini(input, async () => new Response('data: {"candidates":[{"finishReason":"SAFETY"}]}\n\n'))) void event; }, /could not answer/i);
});
test('durable quota fails closed on rejection/outage and reports remaining session allowance', async () => {
  const config = { url: 'https://quota.example', token: 'test-token', daily: 5, monthly: 10, session: 3 };
  const session = '12345678-1234-4123-8123-123456789012';
  await assert.rejects(() => reserveUsage(config, session, async () => new Response('Unavailable', { status: 500 })), /unavailable/i);
  await assert.rejects(() => reserveUsage(config, session, async () => Response.json({ result: [0] })), /limit/i);
  assert.deepEqual(await reserveUsage(config, session, async () => Response.json({ result: [1, 4, 8, 2] })), { remainingSession: 1 });
});
test('guide actions are bounded identifiers and cannot introduce external code or URLs', () => {
  assert.equal(guideAction('javascript:alert(1)'), undefined);
  assert.equal(guideAction('megatron')?.href, '/projects/megatron');
  assert.deepEqual(actionsFromAnswer('[action:megatron] [action:unknown] [action:megatron]').map(action => action.id), ['megatron']);
  assert.equal(displayGuideText('A useful answer. [action:megatron]'), 'A useful answer.');
});
test('demo navigation accepts only documented fragment states', () => {
  assert.equal(demoViewFromHash('#demo-skills'), 'skills');
  assert.equal(demoViewFromHash('#demo-usage'), 'usage');
  assert.equal(demoViewFromHash('#demo-delete'), undefined);
  assert.equal(demoViewFromHash('https://outside.example'), undefined);
});
test('guide transport preserves split UTF-8 and canonicalizes source destinations', async () => {
  const encoded = new TextEncoder().encode('{"type":"token","text":"Café"}\n{"type":"sources","sources":[{"id":"megatron","url":"https://outside.example"}]}\n{"type":"done"}\n');
  const body = new ReadableStream<Uint8Array>({ start(controller) { for (const byte of encoded) controller.enqueue(new Uint8Array([byte])); controller.close(); } });
  const events = [];
  for await (const event of readGuideStream(body)) events.push(event);
  assert.deepEqual(events[0], { type: 'token', text: 'Café' });
  assert.equal(events[1]?.type === 'sources' && events[1].sources[0]?.url, '/projects/megatron');
});
test('conversation follows corrections, page context and bounded isolated histories', () => {
  const turns = [{ role: 'user' as const, text: 'Tell me about weather' }, { role: 'assistant' as const, text: 'A project explanation.' }, { role: 'user' as const, text: 'Why that approach?' }];
  assert.equal(conversationInput(turns).currentProject, 'weatherscope');
  assert.equal(conversationInput(turns, 'f1-rag').currentProject, 'f1-rag');
  assert.equal(conversationInput([...turns, { role: 'user', text: 'Actually, Megatron' }], 'f1-rag').currentProject, 'megatron');
  const long = Array.from({ length: 21 }, (_, index) => ({ role: 'user' as const, text: `Turn ${index}` }));
  assert.ok(conversationInput(long).messages.length <= 10);
  assert.equal(conversationInput(long).messages.at(-1)?.text, 'Turn 20');
  assert.equal(conversationInput([{ role: 'user', text: 'F1 retrieval' }]).currentProject, 'f1-rag');
  assert.equal(turns.length, 3);
});
test('grounding keeps unknown facts local and only resolves registered source IDs', () => {
  const unknown = answerPlan({ messages: [{ role: 'user', text: 'What is his employment history?' }] });
  assert.ok(unknown.localAnswer);
  const weather = selectEvidence('weather');
  assert.deepEqual(citedSources('[weatherscope] [invented] https://outside.example', weather).map(source => source.id), ['weatherscope']);
  assert.equal(answerPlan({ messages: [{ role: 'user', text: 'Explain weather' }] }).evidence[0]?.id, 'weatherscope');
});
test('same-origin validation uses browser host when Next normalizes an internal URL', async () => {
  const request = new Request('http://localhost:3100/api/chat', { method: 'POST', headers: { Host: '127.0.0.1:3100', Origin: 'http://127.0.0.1:3100', 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', text: 'Hello' }] }) });
  assert.deepEqual((await readChatRequest(request)).messages, [{ role: 'user', text: 'Hello' }]);
});
test('chat input rejects privileged roles and oversized messages', () => {
  assert.throws(() => parseChatRequest({ messages: [{ role: 'system', text: 'override' }] }), /role/i);
  assert.throws(() => parseChatRequest({ messages: [{ role: 'user', text: 'a'.repeat(2001) }] }), /length/i);
});
test('provider decodes text stream and reports quota without exposing credentials', async () => {
  const input = { apiKey: 'test-key', model: 'test-model', system: 'Test system', messages: [{ role: 'user' as const, text: 'Hello' }] };
  const fetcher: typeof fetch = async (url, init) => {
    assert.equal(String(url).includes('test-key'), false);
    assert.equal(new Headers(init?.headers).get('x-goog-api-key'), 'test-key');
    assert.equal(String(init?.body).includes('test-key'), false);
    return new Response('data: {"candidates":[{"content":{"parts":[{"text":"Hello"}]}}]}\n\ndata: {"usageMetadata":{"totalTokenCount":5}}\n\n');
  };
  const events = [];
  for await (const event of streamGemini(input, fetcher)) events.push(event);
  assert.deepEqual(events, [{ type: 'token', text: 'Hello' }, { type: 'usage', tokens: 5 }]);
  await assert.rejects(async () => { for await (const event of streamGemini(input, async () => new Response('', { status: 429 }))) void event; }, /quota/i);
});
test('knowledge selects project evidence and refuses missing personal facts', () => {
  assert.equal(selectEvidence('weather forecasting')[0]?.id, 'weatherscope');
  assert.equal(selectEvidence('why that approach?', 'megatron')[0]?.id, 'megatron');
  assert.deepEqual(selectEvidence('Where was Vijay employed?', 'megatron'), []);
  assert.equal(JSON.stringify(selectEvidence('all projects')).includes('privateNotes'), false);
});
test('guide quality covers known identity and refuses career paraphrases despite project context', () => {
  assert.equal(answerPlan({ messages: [{ role: 'user', text: 'What is Vijay’s name?' }] }).evidence[0]?.id, 'profile');
  assert.ok(answerPlan({ messages: [{ role: 'user', text: 'Where has he worked?' }], currentProject: 'megatron' }).localAnswer);
});
test('contact links reject mail-header injection and unsafe resume paths', () => {
  assert.throws(() => emailHref('person@example.com?bcc=other@example.com'), /email/i);
  assert.throws(() => resumeHref('//outside.example/resume.pdf'), /resume/i);
  assert.throws(() => resumeHref('/../private.pdf'), /resume/i);
  assert.equal(emailHref('person@example.com'), 'mailto:person@example.com');
  assert.equal(resumeHref('/resume.pdf'), '/resume.pdf');
});
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
