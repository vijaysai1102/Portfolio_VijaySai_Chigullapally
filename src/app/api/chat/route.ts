import { ChatError } from '@/lib/chat-contract';
import { streamGemini } from '@/lib/server/gemini';
import { readChatRequest } from '@/lib/server/request';
import { answerPlan, citedSources } from '@/lib/grounding';
import { conversationInput } from '@/lib/conversation';
import { actionsFromAnswer, guideAction } from '@/lib/guide-actions';
export const runtime = 'nodejs';
export const maxDuration = 30;
const configured = () => process.env.AI_ENABLED === 'true' && process.env.AI_RELEASE_APPROVED === 'true' && Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_MODEL);
const errorMessage = (error: unknown) => error instanceof ChatError ? error.message : error instanceof Error && error.name === 'TimeoutError' ? 'The guide took too long. Please try again.' : 'The guide is unavailable. Please try again later.';
export function GET() { return Response.json({ available: configured() }, { headers: { 'Cache-Control': 'no-store' } }); }
export async function POST(request: Request) {
  try {
    const supplied = await readChatRequest(request);
    const input = conversationInput(supplied.messages, supplied.currentProject, supplied.currentView);
    if (!configured()) throw new ChatError(503, 'The AI guide is offline. You can still explore every project using the links.');
    const plan = answerPlan(input);
    const abort = new AbortController();
    const signal = AbortSignal.any([request.signal, abort.signal]);
    let cancelled = false;
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const send = (event: unknown) => { if (!cancelled) controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`)); };
        try {
          if (plan.localAnswer) {
            send({ type: 'token', text: plan.localAnswer });
            send({ type: 'sources', sources: [] });
            send({ type: 'actions', actions: [guideAction('work')] });
          } else {
            let answer = '';
            for await (const event of streamGemini({ apiKey: process.env.GEMINI_API_KEY!, model: process.env.GEMINI_MODEL!, system: plan.system, messages: input.messages, signal })) {
              if (event.type === 'token') answer += event.text;
              send(event);
            }
            const sources = citedSources(answer, plan.evidence);
            if (!sources.length) throw new ChatError(422, 'The answer could not be linked to approved evidence. Please open a project source or try again.');
            send({ type: 'sources', sources });
            send({ type: 'actions', actions: actionsFromAnswer(answer) });
          }
          send({ type: 'done' });
        } catch (error) { if (!cancelled) send({ type: 'error', message: errorMessage(error) }); }
        finally { if (!cancelled) controller.close(); }
      },
      cancel() { cancelled = true; abort.abort(); },
    });
    return new Response(stream, { headers: { 'Content-Type': 'application/x-ndjson', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' } });
  } catch (error) { return Response.json({ error: errorMessage(error) }, { status: error instanceof ChatError ? error.status : 503, headers: { 'Cache-Control': 'no-store' } }); }
}
