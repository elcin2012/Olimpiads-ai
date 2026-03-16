import { NextResponse } from 'next/server';
import { generateAiProblem } from '@/lib/ai/educationAi';

export async function POST(request: Request) {
  const payload = await request.json();
  const problem = generateAiProblem(payload.topic ?? 'Алгебра', payload.difficulty ?? 1);
  return NextResponse.json(problem);
}
