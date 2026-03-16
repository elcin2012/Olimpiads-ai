import { runAgentPipeline } from '@/lib/agents/agentRouter';
import { retrieveTopProblems } from '@/lib/rag/ragRetriever';
import type { AssistantPayload } from '@/types/assistant';

export async function runAssistant(payload: AssistantPayload) {
  const context = await retrieveTopProblems(payload.subject, payload.topic, 10);
  const result = await runAgentPipeline(payload, context);
  return { result, contextCount: context.length };
}
