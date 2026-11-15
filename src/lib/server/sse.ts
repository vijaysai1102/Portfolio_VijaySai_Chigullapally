import { ChatError } from '../chat-contract';
const MAX_STREAM_BYTES = 1_000_000;
const MAX_FRAME_CHARS = 65536;
export async function* sseData(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let received = 0;
  const data = (frame: string) => frame.split(/\r?\n/).filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      received += chunk.value.byteLength;
      if (received > MAX_STREAM_BYTES) throw new ChatError(502, 'The provider response exceeded its limit');
      buffer += decoder.decode(chunk.value, { stream: true });
      let boundary: RegExpExecArray | null;
      while ((boundary = /\r?\n\r?\n/.exec(buffer))) {
        const frame = buffer.slice(0, boundary.index);
        if (frame.length > MAX_FRAME_CHARS) throw new ChatError(502, 'Provider frame exceeded its limit');
        buffer = buffer.slice(boundary.index + boundary[0].length);
        const payload = data(frame);
        if (payload && payload !== '[DONE]') yield payload;
      }
      if (buffer.length > MAX_FRAME_CHARS) throw new ChatError(502, 'Provider frame exceeded its limit');
    }
    buffer += decoder.decode();
    const payload = data(buffer);
    if (payload && payload !== '[DONE]') yield payload;
  } finally { await reader.cancel(); reader.releaseLock(); }
}
