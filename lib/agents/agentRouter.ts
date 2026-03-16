import { modePrompt, agentPrompt } from '@/lib/ai/prompts';
import { getLlmProvider } from '@/lib/ai/providerFactory';
import { safeParseModelJson } from '@/lib/formatters/responseFormatter';
import type { AgentName, AssistantPayload, AssistantResult, RetrievedProblem } from '@/types/assistant';

async function runAgent(agent: AgentName, payload: AssistantPayload, ctx: RetrievedProblem[], draft?: string) {
  const provider = getLlmProvider();
  const raw = await provider.generate(agentPrompt(agent, payload, ctx, draft));
  return safeParseModelJson(raw);
}

export async function runAgentPipeline(payload: AssistantPayload, ctx: RetrievedProblem[]): Promise<AssistantResult> {
  const provider = getLlmProvider();
  const pipeline: AssistantResult['pipeline'] = [];

  if (payload.mode === 'SOLVE') {
    const solved = await runAgent('solver', payload, ctx);
    pipeline?.push({ agent: 'solver', status: 'ok', note: 'Решение построено' });
    const verified = await runAgent('verifier', payload, ctx, JSON.stringify(solved));
    pipeline?.push({ agent: 'verifier', status: 'ok', note: 'Логика проверена' });
    return { ...solved, ...verified, pipeline };
  }

  if (payload.mode === 'CREATE') {
    const generated = await runAgent('generator', payload, ctx);
    pipeline?.push({ agent: 'generator', status: 'ok', note: 'Задача сгенерирована' });
    const solved = await runAgent('solver', payload, ctx, JSON.stringify(generated));
    pipeline?.push({ agent: 'solver', status: 'ok', note: 'Решение получено' });
    const verified = await runAgent('verifier', payload, ctx, JSON.stringify(solved));
    pipeline?.push({ agent: 'verifier', status: 'ok', note: 'Проверка пройдена' });
    const diff = await runAgent('difficultyEstimator', payload, ctx, JSON.stringify(generated));
    pipeline?.push({ agent: 'difficultyEstimator', status: 'ok', note: 'Сложность оценена' });
    return { ...generated, ...solved, ...verified, ...diff, pipeline };
  }

  if (payload.mode === 'VERIFY') {
    const verified = await runAgent('verifier', payload, ctx);
    pipeline?.push({ agent: 'verifier', status: 'ok', note: 'Решение проверено' });
    return { ...verified, pipeline };
  }

  if (payload.mode === 'HINT') {
    const hints = await runAgent('hintAgent', payload, ctx);
    pipeline?.push({ agent: 'hintAgent', status: 'ok', note: 'Подсказки сгенерированы' });
    return { ...hints, pipeline };
  }

  const raw = await provider.generate(modePrompt(payload.mode, payload, ctx));
  pipeline?.push({ agent: 'solver', status: 'fallback', note: 'Использован общий режимный промпт' });
  return { ...safeParseModelJson(raw), pipeline };
}
