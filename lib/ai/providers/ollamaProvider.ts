import { fetchWithTimeout, withRetry, type LlmProvider } from './types';

export class OllamaProvider implements LlmProvider {
  constructor(private baseUrl: string, private model: string) {}

  async generate(prompt: string): Promise<string> {
    return withRetry(async () => {
      const response = await fetchWithTimeout(
        `${this.baseUrl}/api/generate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: this.model,
            prompt,
            stream: false,
            format: 'json',
            options: { temperature: 0.3 }
          })
        },
        Number(process.env.LLM_TIMEOUT_MS ?? 30000)
      );

      if (!response.ok) {
        throw new Error(`Ollama provider error: ${response.status}`);
      }

      const data = await response.json();
      return data.response ?? '{}';
    }, Number(process.env.LLM_RETRIES ?? 1));
  }
}
