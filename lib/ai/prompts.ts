import type { AgentName, AssistantMode, AssistantPayload, RetrievedProblem } from '@/types/assistant';

const systemBase = `Ты — AI-платформа для олимпиадной подготовки.\nЯзык ответа: только русский.\nПиши кратко, логично, структурированно.\nНе галлюцинируй: если информации недостаточно, явно укажи неопределенность в поле uncertainty.\nУровень строго соответствует предмету и классу.\nОтвет только JSON, без markdown.`;

function contextBlock(ctx: RetrievedProblem[]): string {
  if (!ctx.length) return 'Контекст из базы: отсутствует.';
  const compact = ctx
    .slice(0, 10)
    .map((p, idx) => `${idx + 1}) [${p.subject}; grade=${p.grade ?? 'n/a'}; diff=${p.difficulty ?? 'n/a'}] ${p.problem_text}`)
    .join('\n');
  return `Контекст из базы (top-${Math.min(10, ctx.length)}):\n${compact}`;
}

export const invalidGradePrompt =
  'Комбинация предмета и класса недопустима. Вежливо объясни ограничения и предложи корректный диапазон.';

export function solvePrompt(payload: AssistantPayload, ctx: RetrievedProblem[]): string {
  return `${systemBase}\nРежим SOLVE: реши задачу пошагово и дай финальный ответ.\nJSON: {"idea":"...","steps":["..."],"answer":"...","difficulty":1..5,"uncertainty":"..."?}\n${contextBlock(ctx)}\nВход: ${JSON.stringify(payload)}`;
}

export function createPrompt(payload: AssistantPayload, ctx: RetrievedProblem[]): string {
  return `${systemBase}\nРежим CREATE: создай оригинальную олимпиадную задачу, реши ее, укажи сложность.\nJSON: {"generatedProblem":{"statement":"...","solution":"...","answer":"..."},"difficulty":1..5,"steps":["..."]}\n${contextBlock(ctx)}\nВход: ${JSON.stringify(payload)}`;
}

export function verifyPrompt(payload: AssistantPayload, ctx: RetrievedProblem[]): string {
  return `${systemBase}\nРежим VERIFY: проверь решение ученика на логику и корректность.\nJSON: {"analysis":{"correct":["..."],"mistakes":["..."],"fixes":["..."]},"answer":"корректный итог"}\n${contextBlock(ctx)}\nВход: ${JSON.stringify(payload)}`;
}

export function hintPrompt(payload: AssistantPayload, ctx: RetrievedProblem[]): string {
  return `${systemBase}\nРежим HINT: выдай 1-3 подсказки, без полного решения.\nJSON: {"hints":["..."],"uncertainty":"..."?}\n${contextBlock(ctx)}\nВход: ${JSON.stringify(payload)}`;
}

export function tourPrompt(payload: AssistantPayload, ctx: RetrievedProblem[]): string {
  return `${systemBase}\nРежим TOUR: сгенерируй 3-5 задач от простой к сложной с краткими решениями.\nJSON: {"problems":[{"statement":"...","solution":"...","answer":"...","difficulty":1..5}]}\n${contextBlock(ctx)}\nВход: ${JSON.stringify(payload)}`;
}

export function similarPrompt(payload: AssistantPayload, ctx: RetrievedProblem[]): string {
  return `${systemBase}\nРежим SIMILAR: создай 3 похожих задачи на основе исходной, с идеей и сложностью.\nJSON: {"similarProblems":[{"statement":"...","shortIdea":"...","difficulty":1..5}]}\n${contextBlock(ctx)}\nВход: ${JSON.stringify(payload)}`;
}

export function theoryPrompt(payload: AssistantPayload, ctx: RetrievedProblem[]): string {
  return `${systemBase}\nРежим THEORY: объясни теорию и ключевые методы по теме.\nJSON: {"theory":"...","steps":["ключевые принципы"],"hints":["как тренироваться"]}\n${contextBlock(ctx)}\nВход: ${JSON.stringify(payload)}`;
}

export function agentPrompt(agent: AgentName, payload: AssistantPayload, ctx: RetrievedProblem[], draft?: string): string {
  const base = `${systemBase}\nАгент: ${agent}.\n${contextBlock(ctx)}\nВход: ${JSON.stringify(payload)}\nЧерновик: ${draft ?? 'нет'}`;
  switch (agent) {
    case 'solver':
      return `${base}\nВерни JSON: {"idea":"...","steps":["..."],"answer":"..."}`;
    case 'verifier':
      return `${base}\nПроверь логическую корректность. Верни JSON: {"analysis":{"correct":["..."],"mistakes":["..."],"fixes":["..."]},"answer":"..."}`;
    case 'generator':
      return `${base}\nСгенерируй задачу. Верни JSON: {"generatedProblem":{"statement":"...","solution":"...","answer":"..."}}`;
    case 'difficultyEstimator':
      return `${base}\nОцени сложность 1..5. Верни JSON: {"difficulty":3,"idea":"почему"}`;
    case 'similarityAgent':
      return `${base}\nСгенерируй похожие задачи. Верни JSON: {"similarProblems":[{"statement":"...","shortIdea":"...","difficulty":1}]}`;
    case 'hintGenerator':
      return `${base}\nДай 1-3 подсказки. Верни JSON: {"hints":["..."]}`;
  }
}

export function modePrompt(mode: AssistantMode, payload: AssistantPayload, ctx: RetrievedProblem[]): string {
  switch (mode) {
    case 'SOLVE':
      return solvePrompt(payload, ctx);
    case 'CREATE':
      return createPrompt(payload, ctx);
    case 'VERIFY':
      return verifyPrompt(payload, ctx);
    case 'HINT':
      return hintPrompt(payload, ctx);
    case 'TOUR':
      return tourPrompt(payload, ctx);
    case 'SIMILAR':
      return similarPrompt(payload, ctx);
    case 'THEORY':
      return theoryPrompt(payload, ctx);
  }
}
