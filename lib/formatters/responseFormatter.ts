import type { AssistantPayload, AssistantResponse, AssistantResult } from '@/types/assistant';

export function formatAssistantResponse(payload: AssistantPayload, llmRaw: string): AssistantResponse {
  let parsed: AssistantResult = {};

  try {
    parsed = JSON.parse(llmRaw);
  } catch {
    parsed = { idea: 'Не удалось распарсить ответ модели.', steps: [llmRaw] };
  }

  return {
    subject: payload.subject,
    grade: payload.grade,
    mode: payload.mode,
    topic: payload.topic ?? 'Не указана',
    result: parsed
  };
}
