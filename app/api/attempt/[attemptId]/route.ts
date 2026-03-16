import { NextResponse } from 'next/server';
import { getAttempt } from '@/lib/domain/attemptStore';
import { questions, olympiads, subjects } from '@/lib/data/mockData';
import { calculateScore, collectWeakTopics } from '@/lib/domain/scoring';
import { buildAiRecommendations } from '@/lib/ai/educationAi';

export async function GET(_: Request, { params }: { params: { attemptId: string } }) {
  const attempt = getAttempt(params.attemptId);
  if (!attempt) return NextResponse.json({ error: 'Attempt not found' }, { status: 404 });

  const olympiadQuestions = questions.filter((q) => q.olympiadId === attempt.olympiadId);
  const score = calculateScore(attempt.answers, olympiadQuestions);
  const weakTopics = collectWeakTopics(score.detailed);

  const olympiad = olympiads.find((o) => o.id === attempt.olympiadId);
  const subject = subjects.find((s) => s.id === olympiad?.subjectId);
  const ai = buildAiRecommendations({ weakTopics, subjectName: subject?.name ?? 'Предмет' });

  return NextResponse.json({ attempt, score, weakTopics, ai, questions: olympiadQuestions });
}
