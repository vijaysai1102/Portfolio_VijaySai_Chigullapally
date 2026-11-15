import { MAX_MESSAGE_CHARS, MAX_MESSAGES, parseChatRequest, type ChatMessage, type ChatRequest } from './chat-contract';
import type { DemoView } from './demo';
function topic(text: string): string | undefined {
  const candidates: [string, RegExp][] = [
    ['living-campus', /\b(living[- ]campus|campus|npcs?)\b/i],
    ['megatron', /\b(megatron|skills?|plugins?)\b/i],
    ['weatherscope', /\b(weatherscope|weather|forecasting|precipitation)\b/i],
    ['f1-rag', /\b(f1|formula|regulations?|rag)\b/i],
    ['pingback', /\b(pingback|notifications?)\b/i],
  ];
  return candidates.find(([, pattern]) => pattern.test(text))?.[0];
}
export function conversationInput(messages: ChatMessage[], currentProject?: string, currentView?: DemoView): ChatRequest {
  const lastQuestion = messages.findLast(message => message.role === 'user')?.text ?? '';
  const previousTopic = messages.filter(message => message.role === 'user').map(message => topic(message.text)).findLast(Boolean);
  const current = topic(lastQuestion) ?? currentProject ?? previousTopic;
  const bounded = messages.filter(message => message.text.trim()).slice(-MAX_MESSAGES).map(message => ({ ...message, text: message.role === 'assistant' ? message.text.slice(0, MAX_MESSAGE_CHARS) : message.text }));
  if (bounded[0]?.role === 'assistant') bounded.shift();
  return parseChatRequest({ messages: bounded, ...(current ? { currentProject: current } : {}), ...(current === 'megatron' && currentView ? { currentView } : {}) });
}
