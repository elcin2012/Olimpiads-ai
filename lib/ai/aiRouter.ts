import { runAgentPipeline } from '@/lib/agents/agentRouter';
import { getCache, setCache } from '@/lib/cache/requestCache';
import { retrieveTopProblems } from '@/lib/rag/ragRetriever';
import type { AssistantPayload, AssistantResult } from '@/types/assistant';

type AssistantRunResponse = { result: AssistantResult; contextCount: number };

export async function runAssistant(payload: AssistantPayload): Promise<AssistantRunResponse> {
  const cacheKey = JSON.stringify(payload);
  const cached = getCache<AssistantRunResponse>(cacheKey);
  if (cached) return cached;

  const context = await retrieveTopProblems(payload.subject, payload.topic, 8);
  const result = await runAgentPipeline(payload, context);
  const response = { result, contextCount: context.length };

  setCache(cacheKey, response, Number(process.env.REQUEST_CACHE_TTL_MS ?? 30000));
  return response;
}
