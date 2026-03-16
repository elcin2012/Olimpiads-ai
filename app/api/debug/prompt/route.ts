import { NextResponse } from 'next/server';
import { getPromptByMode } from '@/lib/ai/prompts';
import { validatePayload } from '@/lib/validators/payloadValidator';
import type { AssistantPayload } from '@/types/assistant';

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<AssistantPayload>;
  const valid = validatePayload(payload);
  if (!valid.ok) {
    return NextResponse.json({ error: valid.error }, { status: 400 });
  }

  const safePayload = payload as AssistantPayload;
  return NextResponse.json({ prompt: getPromptByMode(safePayload.mode, safePayload) });
}
