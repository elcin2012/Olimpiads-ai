import type { AssistantMode, AssistantResult } from '@/types/assistant';

function ensureArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === 'string');
}

export function normalizeResultByMode(mode: AssistantMode, raw: AssistantResult): AssistantResult {
  const result: AssistantResult = { ...raw };

  if (result.steps) result.steps = ensureArray(result.steps);
  if (result.hints) result.hints = ensureArray(result.hints).slice(0, 3);

  if (mode === 'HINT') {
    return { hints: ensureArray(result.hints).slice(0, 3), uncertainty: result.uncertainty, pipeline: result.pipeline };
  }

  if (mode === 'VERIFY') {
    return {
      analysis: {
        correct: ensureArray(result.analysis?.correct),
        mistakes: ensureArray(result.analysis?.mistakes),
        fixes: ensureArray(result.analysis?.fixes)
      },
      answer: result.answer ?? '',
      pipeline: result.pipeline
    };
  }

  if (typeof result.difficulty === 'number') {
    result.difficulty = Math.max(1, Math.min(5, Math.round(result.difficulty)));
  }

  return result;
}
