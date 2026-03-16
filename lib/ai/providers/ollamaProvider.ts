import type { LlmProvider } from './types';

export class OllamaProvider implements LlmProvider {
  constructor(private baseUrl: string, private model: string) {}

  async generate(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        prompt,
        stream: false,
        options: { temperature: 0.3 }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama provider error: ${response.status}`);
    }

    const data = await response.json();
    return data.response ?? '{}';
  }
}
