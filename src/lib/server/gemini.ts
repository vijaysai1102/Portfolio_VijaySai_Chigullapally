import type { ChatMessage } from '../chat-contract';
import { ChatError } from '../chat-contract';
import { sseData } from './sse';
export type ProviderEvent = { type: 'token'; text: string } | { type: 'usage'; tokens: number };
export type Generation = { apiKey: string; model: string; system: string; messages: ChatMessage[]; signal?: AbortSignal };
export async function* streamGemini(input: Generation, fetcher: typeof fetch = fetch): AsyncGenerator<ProviderEvent> {
  if (!/^[a-z0-9][a-z0-9.-]{0,99}$/.test(input.model) || !input.apiKey) throw new ChatError(503, 'The guide is not configured');
  const signal = AbortSignal.any([AbortSignal.timeout(20000), ...(input.signal ? [input.signal] : [])]);
  const response = await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(input.model)}:streamGenerateContent?alt=sse`, {
    method: 'POST', signal, headers: { 'Content-Type': 'application/json', 'x-goog-api-key': input.apiKey },
    body: JSON.stringify({ systemInstruction: { parts: [{ text: input.system }] }, contents: input.messages.map(message => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.text }] })), generationConfig: { maxOutputTokens: 1000, temperature: 0.2 } }),
  });
  if (response.status === 429) throw new ChatError(429, 'The guide reached its provider quota. Please try later.');
  if (!response.ok || !response.body) throw new ChatError(502, 'The AI provider is unavailable. Please try later.');
  let textLength = 0;
  for await (const payload of sseData(response.body)) {
    let event: { candidates?: { finishReason?: string; content?: { parts?: { text?: string; thought?: boolean }[] } }[]; usageMetadata?: { totalTokenCount?: number }; promptFeedback?: { blockReason?: string } };
    try { event = JSON.parse(payload); } catch { throw new ChatError(502, 'The provider returned an unreadable response'); }
    if (!event || typeof event !== 'object') throw new ChatError(502, 'The provider response is invalid');
    const candidate = event.candidates?.[0];
    if (event.promptFeedback?.blockReason || ['SAFETY', 'RECITATION', 'PROHIBITED_CONTENT', 'BLOCKLIST'].includes(candidate?.finishReason ?? '')) throw new ChatError(422, 'The provider could not answer that question. Try a project question.');
    for (const part of candidate?.content?.parts ?? []) {
      if (typeof part.text !== 'string' || part.thought) continue;
      textLength += part.text.length;
      if (textLength > 6000) throw new ChatError(502, 'The guide response exceeded its length limit');
      yield { type: 'token', text: part.text };
    }
    const tokens = event.usageMetadata?.totalTokenCount;
    if (typeof tokens === 'number' && Number.isFinite(tokens) && tokens >= 0) yield { type: 'usage', tokens };
  }
  if (!textLength) throw new ChatError(502, 'The guide returned no answer. Please try again.');
}
