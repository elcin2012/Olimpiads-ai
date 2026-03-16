import { getPool } from '@/lib/db/pg';
import type { AssistantPayload, AssistantResponse } from '@/types/assistant';

export async function logAssistantRequest(payload: AssistantPayload, response: AssistantResponse): Promise<void> {
  const pool = getPool();
  if (!pool) return;

  await pool.query(
    `insert into assistant_requests (mode, subject, grade, topic, input_text, output_text)
     values ($1, $2, $3, $4, $5, $6)`,
    [
      payload.mode,
      payload.subject,
      payload.grade,
      payload.topic ?? null,
      JSON.stringify({ problemText: payload.problemText, studentSolution: payload.studentSolution }),
      JSON.stringify(response.result)
    ]
  );
}
