import { NextResponse } from 'next/server';
import { createAttempt } from '@/lib/domain/attemptStore';

export async function POST(request: Request) {
  const payload = await request.json();
  const attempt = createAttempt(payload.olympiadId, payload.studentId);

  return NextResponse.json({ attemptId: attempt.id });
}
