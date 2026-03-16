import { OllamaProvider } from '@/lib/ai/providers/ollamaProvider';
import { OpenAIProvider } from '@/lib/ai/providers/openaiProvider';
import type { LlmProvider } from '@/lib/ai/providers/types';

export function getLlmProvider(): LlmProvider {
  const provider = process.env.LLM_PROVIDER ?? 'openai';

  if (provider === 'ollama') {
    return new OllamaProvider(
      process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
      process.env.OLLAMA_MODEL ?? 'llama3.1:8b'
    );
  }

  return new OpenAIProvider(
    process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1',
    process.env.OPENAI_API_KEY ?? '',
    process.env.OPENAI_MODEL ?? 'gpt-4o-mini'
  );
}
