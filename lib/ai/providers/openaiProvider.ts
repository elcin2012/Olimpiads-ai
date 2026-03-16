import { fetchWithTimeout, withRetry, type LlmProvider } from './types';

export class OpenAIProvider implements LlmProvider {
  constructor(
    private baseUrl: string,
    private apiKey: string,
    private model: string
  ) {}

  async generate(prompt: string): Promise<string> {
    return withRetry(async () => {
      const response = await fetchWithTimeout(
        `${this.baseUrl}/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: this.model,
            temperature: 0.3,
            response_format: { type: 'json_object' },
            messages: [{ role: 'user', content: prompt }]
          })
        },
        Number(process.env.LLM_TIMEOUT_MS ?? 30000)
      );

      if (!response.ok) {
        throw new Error(`OpenAI-compatible provider error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content ?? '{}';
    }, Number(process.env.LLM_RETRIES ?? 1));
  }
}
