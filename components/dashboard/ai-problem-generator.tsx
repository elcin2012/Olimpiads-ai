'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GeneratedProblem {
  problem_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  topic: string;
  difficulty: number;
}

export function AiProblemGenerator() {
  const [problem, setProblem] = useState<GeneratedProblem | null>(null);

  async function generate() {
    const response = await fetch('/api/ai/generate-problem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: 'Неравенства', difficulty: 2 })
    });

    const payload = await response.json();
    setProblem(payload);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">AI-генерация задач</h2>
        <Button onClick={generate}>Сгенерировать</Button>
      </div>
      {problem && (
        <pre className="mt-3 overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-100">
          {JSON.stringify(problem, null, 2)}
        </pre>
      )}
    </Card>
  );
}
