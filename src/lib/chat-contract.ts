export const MAX_MESSAGE_CHARS = 2000;
export const MAX_MESSAGES = 10;
export const MAX_BODY_BYTES = 24000;
export type ChatMessage = { role: 'user' | 'assistant'; text: string };
export type ChatRequest = { messages: ChatMessage[]; currentProject?: string };
export class ChatError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export function parseChatRequest(value: unknown): ChatRequest {
  if (!value || typeof value !== 'object') throw new ChatError(400, 'A conversation is required');
  const input = value as Record<string, unknown>;
  if (!Array.isArray(input.messages) || !input.messages.length || input.messages.length > MAX_MESSAGES) throw new ChatError(400, 'Conversation length is invalid');
  const messages = input.messages.map(item => {
    if (!item || typeof item !== 'object' || !['user', 'assistant'].includes(item.role)) throw new ChatError(400, 'Message role is invalid');
    if (typeof item.text !== 'string' || !item.text.trim() || item.text.length > MAX_MESSAGE_CHARS) throw new ChatError(400, 'Message length is invalid');
    return { role: item.role as ChatMessage['role'], text: item.text.trim() };
  });
  if (messages.at(-1)?.role !== 'user') throw new ChatError(400, 'The last message must be from the visitor');
  const currentProject = input.currentProject;
  if (currentProject !== undefined && (typeof currentProject !== 'string' || !['megatron', 'weatherscope', 'f1-rag', 'pingback'].includes(currentProject))) throw new ChatError(400, 'Current project is invalid');
  return { messages, ...(currentProject ? { currentProject: String(currentProject) } : {}) };
}
