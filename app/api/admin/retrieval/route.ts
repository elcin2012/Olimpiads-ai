import { NextResponse } from 'next/server';
import { retrieveTopProblems } from '@/lib/rag/ragRetriever';
import type { Subject } from '@/types/assistant';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = (searchParams.get('subject') ?? 'mathematics') as Subject;
  const topic = searchParams.get('topic') ?? undefined;
  const rows = await retrieveTopProblems(subject, topic, 10);
  return NextResponse.json({ count: rows.length, rows });
}
