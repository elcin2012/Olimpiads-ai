import { randomUUID } from 'crypto';
import { Attempt, AttemptAnswer } from '@/lib/domain/types';

const attempts = new Map<string, Attempt>();

export function createAttempt(olympiadId: string, studentId: string) {
  const attempt: Attempt = {
    id: randomUUID(),
    olympiadId,
    studentId,
    startedAt: new Date().toISOString(),
    answers: []
  };

  attempts.set(attempt.id, attempt);
  return attempt;
}

export function getAttempt(attemptId: string) {
  return attempts.get(attemptId);
}

export function saveAttemptAnswers(attemptId: string, answers: AttemptAnswer[]) {
  const attempt = attempts.get(attemptId);
  if (!attempt) return null;

  attempt.answers = answers;
  attempt.submittedAt = new Date().toISOString();
  attempts.set(attemptId, attempt);

  return attempt;
}
