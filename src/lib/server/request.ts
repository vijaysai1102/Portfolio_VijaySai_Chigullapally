import { ChatError, MAX_BODY_BYTES, parseChatRequest } from '../chat-contract';
export async function readChatRequest(request: Request) {
  let origin: URL;
  try { origin = new URL(request.headers.get('origin') ?? ''); }
  catch { throw new ChatError(403, 'This request must come from the portfolio'); }
  // Next may normalize the internal URL hostname; the browser's Host retains the requested authority.
  if (!['http:', 'https:'].includes(origin.protocol) || origin.host !== request.headers.get('host')) throw new ChatError(403, 'This request must come from the portfolio');
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new ChatError(415, 'JSON input is required');
  if (!request.body) throw new ChatError(400, 'A question is required');
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = '';
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      bytes += result.value.byteLength;
      if (bytes > MAX_BODY_BYTES) { await reader.cancel(); throw new ChatError(413, 'The conversation is too large'); }
      text += decoder.decode(result.value, { stream: true });
    }
  } finally { reader.releaseLock(); }
  text += decoder.decode();
  let value: unknown;
  try { value = JSON.parse(text); } catch { throw new ChatError(400, 'The question format is invalid'); }
  return parseChatRequest(value);
}
