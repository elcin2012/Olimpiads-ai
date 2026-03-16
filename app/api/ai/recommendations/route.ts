import { NextResponse } from 'next/server';
import { buildAiRecommendations } from '@/lib/ai/educationAi';

export async function POST(request: Request) {
  const payload = await request.json();

  const recommendations = buildAiRecommendations({
    weakTopics: payload.weakTopics ?? [],
    subjectName: payload.subjectName ?? 'Математика'
  });

  return NextResponse.json(recommendations);
}
