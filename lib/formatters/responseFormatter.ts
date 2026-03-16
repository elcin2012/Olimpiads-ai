import type { AssistantPayload, AssistantResponse, AssistantResult } from '@/types/assistant';
import { normalizeResultByMode } from '@/lib/formatters/resultValidator';

export function safeParseModelJson(raw: string): AssistantResult {
  try {
    return JSON.parse(raw) as AssistantResult;
  } catch {
    const cleaned = raw.replace(/```json|```/g, '').trim();
    try {
      return JSON.parse(cleaned) as AssistantResult;
    } catch {
      return {
        idea: 'Модель вернула невалидный JSON.',
        steps: [raw],
        uncertainty: 'Формат ответа модели не распознан автоматически.'
      };
    }
  }
}

export function formatAssistantResponse(payload: AssistantPayload, result: AssistantResult, retrievedContextCount: number): AssistantResponse {
  return {
    subject: payload.subject,
    grade: payload.grade,
    mode: payload.mode,
    topic: payload.topic ?? 'Не указана',
    result: normalizeResultByMode(payload.mode, result),
    retrievedContextCount
  };
}
