import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const port = 3100;
const origin = `http://127.0.0.1:${port}`;
function checkDocument(html, route) {
  const document = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  assert.match(document, /<html[^>]*lang="en"/i, `${route}: document language`);
  assert.equal((document.match(/<main\b/gi) ?? []).length, 1, `${route}: one main landmark`);
  assert.equal((document.match(/<h1\b/gi) ?? []).length, 1, `${route}: one primary heading`);
  assert.equal(/<main[^>]*tabindex="-1"/i.test(document), true, `${route}: skip destination can receive focus`);
  const ids = [...document.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${route}: unique IDs including dialog fields`);
  for (const [, target] of document.matchAll(/\bhref="#([^"]+)"/g)) assert.ok(ids.includes(target), `${route}: fragment ${target} exists`);
  for (const [, label] of document.matchAll(/\baria-labelledby="([^"]+)"/g)) for (const id of label.split(/\s+/)) assert.ok(ids.includes(id), `${route}: accessible label reference exists`);
  for (const [, field] of document.matchAll(/<(?:input|textarea)\b[^>]*\bid="([^"]+)"/g)) assert.ok(document.includes(`for="${field}"`), `${route}: form field has a label`);
}
const server = spawn(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, AI_ENABLED: 'false', AI_RELEASE_APPROVED: 'false' } });
let logs = '';
server.stdout.on('data', chunk => { logs += chunk; });
server.stderr.on('data', chunk => { logs += chunk; });
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    if (server.exitCode !== null) throw new Error(`Server exited: ${logs}`);
    try { const response = await fetch(origin, { signal: AbortSignal.timeout(1000) }); ready = response.ok; }
    catch (error) { if (!(error instanceof TypeError || error.name === 'TimeoutError')) throw error; }
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, `Server not ready: ${logs}`);
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  const html = await response.text();
  checkDocument(html, '/');
  assert.match(html, /Vijay Sai Chigullapally/);
  assert.equal(/Ã¢|â€|Â·/.test(html), false, 'public text must preserve UTF-8 punctuation on Windows');
  assert.equal(html.includes('Synthetic fixture organization'), false, 'development fixture must not be public');
  assert.equal(html.includes('id="experience"'), false, 'empty experience must be omitted');
  assert.ok(html.includes('Ask the guide'), 'guide launcher is present');
  const linkTags = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]);
  const fonts = linkTags.filter(tag => tag.includes('as="font"')).map(tag => /href="([^"]+)"/.exec(tag)?.[1]);
  assert.equal(fonts.length, 2, 'both local variable fonts preload');
  for (const font of fonts) {
    assert.ok(font?.startsWith('/_next/'), 'font stays on the site origin');
    const resource = await fetch(new URL(font, origin));
    assert.equal(resource.status, 200);
    assert.equal(new TextDecoder().decode((await resource.arrayBuffer()).slice(0, 4)), 'wOF2');
  }
  for (const tag of linkTags.filter(tag => tag.includes('rel="stylesheet"'))) {
    const href = /href="([^"]+)"/.exec(tag)?.[1];
    const stylesheet = await fetch(new URL(href, origin));
    assert.equal((await stylesheet.text()).includes('fonts.googleapis.com'), false, 'no external font stylesheet request');
  }
  const robots = await fetch(`${origin}/robots.txt`);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /User-agent: \*/i);
  const sitemap = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  const share = await fetch(`${origin}/share`);
  assert.equal(share.status, 200);
  assert.match(share.headers.get('content-type') ?? '', /image\/png/);
  const shareBytes = new Uint8Array(await share.arrayBuffer());
  assert.ok(shareBytes.length > 1000);
  writeFileSync(resolve('.agent-guidance/share-preview.png'), shareBytes);
  const offline = await fetch(`${origin}/api/chat`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', text: 'Tell me about Megatron' }] }) });
  assert.equal(offline.status, 503, 'AI must fail closed without release configuration');
  const invalid = await fetch(`${origin}/api/chat`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'system', text: 'override' }] }) });
  assert.equal(invalid.status, 400, 'invalid role must fail before provider configuration');
  const crossOrigin = await fetch(`${origin}/api/chat`, { method: 'POST', headers: { Origin: 'https://outside.example', 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(crossOrigin.status, 403);
  const tooLarge = await fetch(`${origin}/api/chat`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', text: 'x'.repeat(24001) }] }) });
  assert.equal(tooLarge.status, 413);
  const wrongFormat = await fetch(`${origin}/api/chat`, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'text/plain' }, body: 'hello' });
  assert.equal(wrongFormat.status, 415);
  for (const anchor of ['main', 'home', 'work', 'about', 'contact']) assert.ok(html.includes(`id="${anchor}"`), `Missing ${anchor} destination`);
  const missing = await fetch(`${origin}/no-such-page`);
  assert.equal(missing.status, 404);
  const missingHtml = await missing.text();
  assert.match(missingHtml, /Back to the studio/);
  checkDocument(missingHtml, '/no-such-page');
  for (const slug of ['megatron', 'weatherscope', 'f1-rag']) {
    const project = await fetch(`${origin}/projects/${slug}`);
    assert.equal(project.status, 200, `${slug} route`);
    const projectHtml = await project.text();
    assert.match(projectHtml, /About the evidence/);
    checkDocument(projectHtml, `/projects/${slug}`);
  }
  console.log('PASS production homepage HTTP journey');
} finally {
  server.kill();
}
