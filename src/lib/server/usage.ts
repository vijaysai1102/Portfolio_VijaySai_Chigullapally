import { ChatError } from '../chat-contract';
export type UsageConfig = { url: string; token: string; daily: number; monthly: number; session: number };
const SESSION_SECONDS = 3600;
const DAY_SECONDS = 86400;
const SESSION_COOKIE = 'portfolio_session';
const SESSION_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const RESERVE_SCRIPT = `
local limits = {tonumber(ARGV[1]), tonumber(ARGV[2]), tonumber(ARGV[3])}
for i = 1, 3 do
  local value = tonumber(redis.call('GET', KEYS[i]) or '0')
  if not value or value < 0 then return redis.error_reply('Invalid counter') end
  if value >= limits[i] then return {0} end
end
local counts = {}
for i = 1, 3 do
  counts[i] = redis.call('INCR', KEYS[i])
  if counts[i] == 1 then redis.call('EXPIRE', KEYS[i], tonumber(ARGV[i + 3])) end
end
return {1, counts[1], counts[2], counts[3]}
`;
export function usageConfig(environment: Record<string, string | undefined> = process.env): UsageConfig {
  const urlValue = environment.UPSTASH_REDIS_REST_URL;
  const token = environment.UPSTASH_REDIS_REST_TOKEN;
  let url: URL;
  try { url = new URL(urlValue ?? ''); } catch { throw new ChatError(503, 'Usage controls are not configured'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash || !token?.trim()) throw new ChatError(503, 'Usage controls are not configured');
  const limit = (name: string) => {
    const raw = environment[name];
    const value = Number(raw);
    if (!raw || !Number.isSafeInteger(value) || value < 1 || value > 1000000) throw new ChatError(503, 'Usage limits must be configured before enabling the guide');
    return value;
  };
  return { url: url.origin, token, daily: limit('AI_DAILY_REQUEST_LIMIT'), monthly: limit('AI_MONTHLY_REQUEST_LIMIT'), session: limit('AI_SESSION_REQUEST_LIMIT') };
}
export function usageConfigured(): boolean {
  try { usageConfig(); return true; }
  catch (error) { if (error instanceof ChatError) return false; throw error; }
}
export function usageSession(request: Request): { id: string; cookie: string } {
  const value = request.headers.get('cookie')?.split(';').map(item => item.trim()).find(item => item.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1);
  const id = value && SESSION_ID.test(value) ? value : crypto.randomUUID();
  const secure = new URL(request.headers.get('origin')!).protocol === 'https:' ? '; Secure' : '';
  return { id, cookie: `${SESSION_COOKIE}=${id}; Path=/api/chat; Max-Age=${SESSION_SECONDS}; HttpOnly; SameSite=Strict${secure}` };
}
export async function reserveUsage(config: UsageConfig, sessionId: string, fetcher: typeof fetch = fetch, now = new Date(), signal?: AbortSignal): Promise<{ remainingSession: number }> {
  if (!SESSION_ID.test(sessionId)) throw new ChatError(400, 'Invalid quota session');
  const bucket = now.toISOString();
  const keys = [`{portfolio}:day:${bucket.slice(0, 10)}`, `{portfolio}:month:${bucket.slice(0, 7)}`, `{portfolio}:session:${sessionId}`];
  let response: Response;
  try {
    response = await fetcher(config.url, { method: 'POST', headers: { Authorization: `Bearer ${config.token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(['EVAL', RESERVE_SCRIPT, 3, ...keys, config.daily, config.monthly, config.session, DAY_SECONDS * 2, DAY_SECONDS * 35, SESSION_SECONDS]), signal: AbortSignal.any([AbortSignal.timeout(3000), ...(signal ? [signal] : [])]), cache: 'no-store' });
  } catch { throw new ChatError(503, 'Usage storage is unavailable. Please explore the project links.'); }
  if (!response.ok) throw new ChatError(503, 'Usage storage is unavailable. Please explore the project links.');
  let data: { result?: unknown; error?: unknown };
  try { data = await response.json(); } catch { throw new ChatError(503, 'Usage storage is unavailable.'); }
  const result = data?.result;
  if (!Array.isArray(result) || data.error) throw new ChatError(503, 'Usage storage is unavailable.');
  if (result[0] === 0) throw new ChatError(429, 'The guide has reached its usage limit. Please explore the project links and try later.');
  if (result.length !== 4 || result[0] !== 1 || result.slice(1).some(value => !Number.isSafeInteger(value) || value < 1) || result[1] > config.daily || result[2] > config.monthly || result[3] > config.session) throw new ChatError(503, 'Usage storage returned an invalid reservation.');
  return { remainingSession: config.session - result[3] };
}
