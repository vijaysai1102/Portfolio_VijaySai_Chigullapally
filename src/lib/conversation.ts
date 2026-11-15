import { MAX_MESSAGE_CHARS, MAX_MESSAGES, parseChatRequest, type ChatMessage, type ChatRequest } from './chat-contract';
import type { DemoView } from './demo';
function topic(text: string, context?: string): string | undefined {
  const candidates: [string, RegExp][] = [
    ['living-campus', /\b(living[- ]campus|campus|npcs?)\b/i],
    ['megatron', /\b(megatron|skills?|plugins?)\b/i],
    ['weatherscope', /\b(weatherscope|weather|forecasting|precipitation)\b/i],
    ['f1-rag', /\b(f1|formula|regulations?)\b/i],
    ['pingback', /\b(pingback|notifications?)\b/i],
  ];
  return candidates.find(([, pattern]) => pattern.test(text))?.[0]
    ?? (/\brag\b/i.test(text) ? context ?? 'f1-rag' : undefined);
}
export function conversationInput(messages: ChatMessage[], currentProject?: string, currentView?: DemoView): ChatRequest {
  const lastQuestion = messages.findLast(message => message.role === 'user')?.text ?? '';
  const previousTopic = messages.filter(message => message.role === 'user').slice(0, -1)
    .reduce<string | undefined>((context, message) => topic(message.text, context) ?? context, undefined);
  const current = topic(lastQuestion, currentProject ?? previousTopic) ?? currentProject ?? previousTopic;
  const bounded = messages.filter(message => message.text.trim()).slice(-MAX_MESSAGES).map(message => ({ ...message, text: message.role === 'assistant' ? message.text.slice(0, MAX_MESSAGE_CHARS) : message.text }));
  if (bounded[0]?.role === 'assistant') bounded.shift();
  return parseChatRequest({ messages: bounded, ...(current ? { currentProject: current } : {}), ...(current === 'megatron' && currentView ? { currentView } : {}) });
}
