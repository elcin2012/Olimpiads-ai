import { AttemptAnswer, Question } from '@/lib/domain/types';

export function calculateScore(answers: AttemptAnswer[], olympiadQuestions: Question[]) {
  const byId = new Map(olympiadQuestions.map((q) => [q.id, q]));
  let correctCount = 0;

  const detailed = answers.map((answer) => {
    const question = byId.get(answer.questionId);
    const isCorrect = question?.correctOptionId === answer.selectedOptionId;

    if (isCorrect) correctCount += 1;

    return {
      questionId: answer.questionId,
      isCorrect,
      explanation: question?.explanation ?? 'Объяснение будет доступно позже',
      topic: question?.topic ?? 'Общая тема'
    };
  });

  const total = olympiadQuestions.length || 1;
  const percentage = Math.round((correctCount / total) * 100);

  return {
    correctCount,
    total,
    percentage,
    detailed
  };
}

export function collectWeakTopics(
  detailed: Array<{ isCorrect: boolean; topic: string }>
): string[] {
  const wrongTopics = detailed.filter((row) => !row.isCorrect).map((row) => row.topic);
  return [...new Set(wrongTopics)];
}
