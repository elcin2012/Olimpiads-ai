import { MODES, SUBJECTS, type AssistantPayload } from '@/types/assistant';

export function validatePayload(payload: Partial<AssistantPayload>): { ok: boolean; error?: string } {
  if (!payload.mode || !MODES.includes(payload.mode)) return { ok: false, error: 'Некорректный режим.' };
  if (!payload.subject || !SUBJECTS.includes(payload.subject)) return { ok: false, error: 'Некорректный предмет.' };
  if (typeof payload.grade !== 'number' || Number.isNaN(payload.grade)) return { ok: false, error: 'Укажите корректный класс.' };

  if (['SOLVE', 'VERIFY', 'HINT', 'SIMILAR'].includes(payload.mode) && !payload.problemText?.trim()) {
    return { ok: false, error: 'Для выбранного режима добавьте текст задачи.' };
  }

  if (payload.mode === 'VERIFY' && !payload.studentSolution?.trim()) {
    return { ok: false, error: 'Для VERIFY требуется решение ученика.' };
  }

  return { ok: true };
}
