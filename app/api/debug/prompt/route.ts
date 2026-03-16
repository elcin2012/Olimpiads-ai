import { NextResponse } from 'next/server';
import { modePrompt } from '@/lib/ai/prompts';
import { retrieveTopProblems } from '@/lib/rag/ragRetriever';
import { validatePayload } from '@/lib/validators/payloadValidator';
import type { AssistantPayload } from '@/types/assistant';

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<AssistantPayload>;
  const valid = validatePayload(payload);
  if (!valid.ok) {
    return NextResponse.json({ error: valid.error }, { status: 400 });
  }

  const safePayload = payload as AssistantPayload;
  const ctx = await retrieveTopProblems(safePayload.subject, safePayload.topic, 3);
  return NextResponse.json({ prompt: modePrompt(safePayload.mode, safePayload, ctx) });
}
