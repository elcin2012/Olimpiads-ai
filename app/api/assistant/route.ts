import { NextResponse } from 'next/server';
import { runAssistant } from '@/lib/ai/aiRouter';
import { invalidGradePrompt } from '@/lib/ai/prompts';
import { logAssistantRequest } from '@/lib/db/logRequest';
import { formatAssistantResponse } from '@/lib/formatters/responseFormatter';
import { checkRateLimit } from '@/lib/rate-limit/basicRateLimit';
import { validatePayload } from '@/lib/validators/payloadValidator';
import { validateSubjectGrade } from '@/lib/validators/subjectGradeValidator';
import type { AssistantPayload } from '@/types/assistant';

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<AssistantPayload>;
    const validPayload = validatePayload(payload);

    if (!validPayload.ok) {
      return NextResponse.json({ error: validPayload.error }, { status: 400 });
    }

    const safePayload = payload as AssistantPayload;

    const rateLimitKey = request.headers.get('x-forwarded-for') ?? 'local';
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json({ error: 'Слишком много запросов. Попробуйте позже.' }, { status: 429 });
    }

    const gradeValidation = validateSubjectGrade(safePayload.subject, safePayload.grade);
    if (!gradeValidation.valid) {
      return NextResponse.json({ error: gradeValidation.message, prompt: invalidGradePrompt }, { status: 400 });
    }

    const { result, contextCount } = await runAssistant(safePayload);
    const formatted = formatAssistantResponse(safePayload, result, contextCount);
    await logAssistantRequest(safePayload, formatted);

    return NextResponse.json(formatted);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера.' }, { status: 500 });
  }
}
