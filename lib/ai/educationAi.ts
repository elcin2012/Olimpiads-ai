import { AiGeneratedProblem } from '@/lib/domain/types';

interface RecommendationInput {
  weakTopics: string[];
  subjectName: string;
}

export function buildAiRecommendations(input: RecommendationInput) {
  const weak = input.weakTopics.length ? input.weakTopics : ['Базовые задачи'];

  return {
    summary: `AI выявил зоны роста по предмету «${input.subjectName}». Сфокусируйтесь на: ${weak.join(', ')}.`,
    plan: [
      `Повторите теорию по темам: ${weak.join(', ')}.`,
      'Решите 10 задач среднего уровня и проверьте объяснения к ошибкам.',
      'Пройдите мини-олимпиаду через 48 часов для закрепления материала.'
    ]
  };
}

export function generateAiProblem(topic: string, difficulty: number): AiGeneratedProblem {
  return {
    problem_text: `AI-задача по теме «${topic}»: вычислите значение выражения при заданных условиях.`,
    options: ['12', '14', '16', '18'],
    correct_answer: '16',
    explanation: 'Пошагово подставляем значения, упрощаем выражение и получаем 16.',
    topic,
    difficulty
  };
}
