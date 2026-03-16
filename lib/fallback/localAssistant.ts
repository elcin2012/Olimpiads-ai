import type { AssistantPayload, AssistantResult } from '@/types/assistant';

export function buildLocalFallback(payload: AssistantPayload): AssistantResult {
  switch (payload.mode) {
    case 'CREATE':
      return {
        generatedProblem: {
          statement: `Сгенерируй и реши задачу по теме: ${payload.topic || 'базовая олимпиадная тема'}.`,
          solution: 'Рассмотрите ключевую идею, выделите инвариант/оценку и доведите до конца.',
          answer: 'Ответ зависит от конкретной формулировки задачи.'
        },
        steps: ['Определите модель задачи', 'Примените основной метод', 'Проверьте крайние случаи'],
        difficulty: 3,
        uncertainty: 'LLM недоступна: показан локальный fallback.'
      };
    case 'SOLVE':
      return {
        idea: 'Выделить ключевую структуру задачи и свести к известному факту.',
        steps: ['Переписать условие в удобном виде', 'Решить по шагам', 'Проверить ответ'],
        answer: 'Локальный fallback: требуется подключение LLM для точного ответа.',
        uncertainty: 'LLM недоступна.'
      };
    case 'VERIFY':
      return {
        analysis: {
          correct: ['Структура решения присутствует'],
          mistakes: ['Нельзя гарантировать корректность без LLM-проверки'],
          fixes: ['Подключите LLM и повторите VERIFY']
        },
        answer: 'Промежуточная проверка'
      };
    case 'HINT':
      return { hints: ['Попробуйте рассмотреть частный случай', 'Используйте известную теорему по теме'] };
    case 'TOUR':
      return {
        problems: [
          { statement: 'Базовая задача по теме', difficulty: 1 },
          { statement: 'Средняя задача по теме', difficulty: 3 },
          { statement: 'Сложная задача по теме', difficulty: 5 }
        ]
      };
    case 'SIMILAR':
      return {
        similarProblems: [
          { statement: 'Похожая задача №1', difficulty: 2 },
          { statement: 'Похожая задача №2', difficulty: 3 }
        ]
      };
    case 'THEORY':
      return {
        theory: `Краткая теория по теме: ${payload.topic || 'общая тема'}.`,
        steps: ['Определения', 'Ключевые факты', 'Типовые приемы'],
        hints: ['Решите 3 задачи от простого к сложному']
      };
  }
}
