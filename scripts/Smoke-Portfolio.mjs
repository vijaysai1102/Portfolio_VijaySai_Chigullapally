import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const port = 3100;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
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
  assert.match(html, /Vijay Sai Chigullapally/);
  for (const anchor of ['main', 'home', 'work', 'about', 'contact']) assert.ok(html.includes(`id="${anchor}"`), `Missing ${anchor} destination`);
  const missing = await fetch(`${origin}/no-such-page`);
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /Back to the studio/);
  for (const slug of ['megatron', 'weatherscope', 'f1-rag']) {
    const project = await fetch(`${origin}/projects/${slug}`);
    assert.equal(project.status, 200, `${slug} route`);
    assert.match(await project.text(), /About the evidence/);
  }
  console.log('PASS production homepage HTTP journey');
} finally {
  server.kill();
}
