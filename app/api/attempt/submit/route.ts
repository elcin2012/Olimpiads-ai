import { NextResponse } from 'next/server';
import { saveAttemptAnswers, getAttempt } from '@/lib/domain/attemptStore';
import { olympiads, questions, subjects } from '@/lib/data/mockData';
import { calculateScore, collectWeakTopics } from '@/lib/domain/scoring';
import { buildAiRecommendations } from '@/lib/ai/educationAi';

export async function POST(request: Request) {
  const payload = await request.json();
  const attempt = saveAttemptAnswers(payload.attemptId, payload.answers);

  if (!attempt) {
    return NextResponse.json({ error: 'Attempt not found' }, { status: 404 });
  }

  const olympiad = olympiads.find((item) => item.id === attempt.olympiadId);
  const olympiadQuestions = questions.filter((question) => question.olympiadId === attempt.olympiadId);
  const score = calculateScore(payload.answers, olympiadQuestions);
  const weakTopics = collectWeakTopics(score.detailed);

  const subject = subjects.find((item) => item.id === olympiad?.subjectId);
  const ai = buildAiRecommendations({
    weakTopics,
    subjectName: subject?.name ?? 'Предмет'
  });

  return NextResponse.json({
    attempt: getAttempt(payload.attemptId),
    score,
    weakTopics,
    ai
  });
}
