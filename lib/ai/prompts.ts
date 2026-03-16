import { subjectTopics } from '@/lib/constants';
import type { AgentName, AssistantMode, AssistantPayload, RetrievedProblem } from '@/types/assistant';

const systemBase = `Ты — AI-помощник по олимпиадной подготовке. Язык: русский. Вывод: строго JSON.\nБудь кратким и логичным. Если данных не хватает, заполни поле uncertainty.\nНикогда не нарушай ограничения класса и предмета.`;

function contextBlock(ctx: RetrievedProblem[]): string {
  if (!ctx.length) return 'Контекст: пусто';
  return ctx
    .slice(0, 10)
    .map((p, i) => `${i + 1}) ${p.problem_text} | topic=${p.topic ?? 'n/a'} | diff=${p.difficulty ?? 'n/a'}`)
    .join('\n');
}

function topicHint(subject: AssistantPayload['subject']) {
  return `Рекомендуемые топики для ${subject}: ${subjectTopics[subject].join(', ')}`;
}

export const invalidGradePrompt = 'Комбинация предмета и класса недопустима. Объясни корректный диапазон и попроси изменить выбор.';

export const solvePrompt = (p: AssistantPayload, ctx: RetrievedProblem[]) =>
  `${systemBase}\nРежим SOLVE. Верни JSON: {"idea":"...","steps":["..."],"answer":"...","difficulty":1..5,"uncertainty":"..."?}\n${topicHint(p.subject)}\nКонтекст:\n${contextBlock(ctx)}\nВход:${JSON.stringify(p)}`;

export const createPrompt = (p: AssistantPayload, ctx: RetrievedProblem[]) =>
  `${systemBase}\nРежим CREATE. Верни JSON: {"generatedProblem":{"statement":"...","solution":"...","answer":"..."},"difficulty":1..5,"steps":["..."]}\n${topicHint(p.subject)}\nКонтекст:\n${contextBlock(ctx)}\nВход:${JSON.stringify(p)}`;

export const verifyPrompt = (p: AssistantPayload, ctx: RetrievedProblem[]) =>
  `${systemBase}\nРежим VERIFY. Верни JSON: {"analysis":{"correct":["..."],"mistakes":["..."],"fixes":["..."]},"answer":"..."}\nКонтекст:\n${contextBlock(ctx)}\nВход:${JSON.stringify(p)}`;

export const hintPrompt = (p: AssistantPayload, ctx: RetrievedProblem[]) =>
  `${systemBase}\nРежим HINT. Дай 1-3 подсказки. Верни JSON: {"hints":["..."],"uncertainty":"..."?}\nКонтекст:\n${contextBlock(ctx)}\nВход:${JSON.stringify(p)}`;

export const tourPrompt = (p: AssistantPayload, ctx: RetrievedProblem[]) =>
  `${systemBase}\nРежим TOUR. Создай 3-5 задач с ростом сложности. Верни JSON: {"problems":[{"statement":"...","solution":"...","answer":"...","difficulty":1..5}]}\n${topicHint(p.subject)}\nКонтекст:\n${contextBlock(ctx)}\nВход:${JSON.stringify(p)}`;

export const similarPrompt = (p: AssistantPayload, ctx: RetrievedProblem[]) =>
  `${systemBase}\nРежим SIMILAR. Верни JSON: {"similarProblems":[{"statement":"...","shortIdea":"...","difficulty":1..5}]}\nКонтекст:\n${contextBlock(ctx)}\nВход:${JSON.stringify(p)}`;

export const theoryPrompt = (p: AssistantPayload, ctx: RetrievedProblem[]) =>
  `${systemBase}\nРежим THEORY. Верни JSON: {"theory":"...","steps":["..."],"hints":["..."]}\n${topicHint(p.subject)}\nКонтекст:\n${contextBlock(ctx)}\nВход:${JSON.stringify(p)}`;

export function agentPrompt(agent: AgentName, payload: AssistantPayload, ctx: RetrievedProblem[], draft?: string): string {
  const base = `${systemBase}\nАгент: ${agent}.\n${topicHint(payload.subject)}\nКонтекст:\n${contextBlock(ctx)}\nВход:${JSON.stringify(payload)}\nЧерновик:${draft ?? 'none'}`;
  switch (agent) {
    case 'solver':
      return `${base}\nВерни JSON: {"idea":"...","steps":["..."],"answer":"..."}`;
    case 'verifier':
      return `${base}\nВерни JSON: {"analysis":{"correct":["..."],"mistakes":["..."],"fixes":["..."]},"answer":"..."}`;
    case 'generator':
      return `${base}\nВерни JSON: {"generatedProblem":{"statement":"...","solution":"...","answer":"..."}}`;
    case 'difficultyEstimator':
      return `${base}\nВерни JSON: {"difficulty":1..5,"idea":"..."}`;
    case 'hintAgent':
      return `${base}\nВерни JSON: {"hints":["..."]}`;
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
