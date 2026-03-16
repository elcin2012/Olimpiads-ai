import { runAgentPipeline } from '@/lib/agents/agentRouter';
import { getCache, setCache } from '@/lib/cache/requestCache';
import { ensureMinimumDataset } from '@/lib/dataset/datasetManager';
import { buildLocalFallback } from '@/lib/fallback/localAssistant';
import { retrieveTopProblems } from '@/lib/rag/ragRetriever';
import type { AssistantPayload, AssistantResult } from '@/types/assistant';

type AssistantRunResponse = { result: AssistantResult; contextCount: number };

export async function runAssistant(payload: AssistantPayload): Promise<AssistantRunResponse> {
  const cacheKey = JSON.stringify(payload);
  const cached = getCache<AssistantRunResponse>(cacheKey);
  if (cached) return cached;

  await ensureMinimumDataset(20);
  const context = await retrieveTopProblems(payload.subject, payload.topic, 8);

  let result: AssistantResult;
  try {
    result = await runAgentPipeline(payload, context);
  } catch (error) {
    console.error('LLM pipeline failed, using fallback:', error);
    result = buildLocalFallback(payload);
  }

  const response = { result, contextCount: context.length };
  setCache(cacheKey, response, Number(process.env.REQUEST_CACHE_TTL_MS ?? 30000));
  return response;
}
