import { getPromptByMode } from '@/lib/ai/prompts';
import { getLlmProvider } from '@/lib/ai/providerFactory';
import type { AssistantPayload } from '@/types/assistant';

export async function runAssistant(payload: AssistantPayload): Promise<string> {
  const provider = getLlmProvider();
  const prompt = getPromptByMode(payload.mode, payload);
  return provider.generate(prompt);
}
