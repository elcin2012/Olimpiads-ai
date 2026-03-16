import type { AssistantMode, AssistantPayload } from '@/types/assistant';

const baseSystemPrompt = `Ты — олимпиадный AI-ассистент. Отвечай только на русском языке.\nБудь кратким, точным и структурированным.\nНе выдумывай факты: если не уверен, прямо так и скажи.\nСоблюдай школьный уровень для указанного класса и предмета.\nФорматируй ответ строго в JSON без markdown.`;

export const invalidGradePrompt = 'Выбранный класс не подходит для этого предмета. Попроси пользователя выбрать допустимую комбинацию.';

export const solvePrompt = (p: AssistantPayload) => `${baseSystemPrompt}
Режим: SOLVE.
Определи тему и реши олимпиадную задачу.
Верни JSON: {"idea":"...","steps":["..."],"answer":"..."}
Предмет: ${p.subject}, класс: ${p.grade}, тема: ${p.topic ?? 'не указана'}, задача: ${p.problemText ?? 'не указана'}.`;

export const createPrompt = (p: AssistantPayload) => `${baseSystemPrompt}
Режим: CREATE.
Сгенерируй оригинальную олимпиадную задачу, полное решение и ответ.
Верни JSON: {"idea":"краткая идея","steps":["..."],"answer":"...","difficulty":1-5}
Предмет: ${p.subject}, класс: ${p.grade}, тема: ${p.topic ?? 'не указана'}.`;

export const checkPrompt = (p: AssistantPayload) => `${baseSystemPrompt}
Режим: CHECK.
Проанализируй решение ученика.
Верни JSON: {"analysis":{"correct":["..."],"mistakes":["..."],"fixes":["..."]},"answer":"корректный итог"}
Предмет: ${p.subject}, класс: ${p.grade}, тема: ${p.topic ?? 'не указана'}, задача: ${p.problemText ?? 'не указана'}, решение ученика: ${p.studentSolution ?? 'не указано'}.`;

export const hintPrompt = (p: AssistantPayload) => `${baseSystemPrompt}
Режим: HINT.
Дай только 1-3 подсказки, без полного решения.
Верни JSON: {"hints":["...","..."]}
Предмет: ${p.subject}, класс: ${p.grade}, тема: ${p.topic ?? 'не указана'}, задача: ${p.problemText ?? 'не указана'}.`;

export const tourPrompt = (p: AssistantPayload) => `${baseSystemPrompt}
Режим: TOUR.
Сгенерируй мини-набор из 3-5 задач от простого к сложному.
Верни JSON: {"problems":[{"statement":"...","answer":"...","difficulty":1-5}]}
Предмет: ${p.subject}, класс: ${p.grade}, тема: ${p.topic ?? 'не указана'}.`;

export function getPromptByMode(mode: AssistantMode, payload: AssistantPayload): string {
  switch (mode) {
    case 'SOLVE':
      return solvePrompt(payload);
    case 'CREATE':
      return createPrompt(payload);
    case 'CHECK':
      return checkPrompt(payload);
    case 'HINT':
      return hintPrompt(payload);
    case 'TOUR':
      return tourPrompt(payload);
  }
}
