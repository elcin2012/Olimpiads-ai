import type { AssistantPayload, AssistantResponse } from '@/types/assistant';

export async function logAssistantRequest(payload: AssistantPayload, response: AssistantResponse): Promise<void> {
  if (!process.env.DATABASE_URL) {
    return;
  }

  // Заглушка для MVP: сюда можно подключить pg/supabase insert.
  void payload;
  void response;
}
