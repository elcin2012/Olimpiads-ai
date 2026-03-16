'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface ResultPayload {
  score: {
    correctCount: number;
    total: number;
    percentage: number;
    detailed: Array<{ questionId: string; isCorrect: boolean; explanation: string; topic: string }>;
  };
  ai: { summary: string; plan: string[] };
}

export function ResultSummary({ attemptId }: { attemptId: string }) {
  const [data, setData] = useState<ResultPayload | null>(null);

  useEffect(() => {
    fetch(`/api/attempt/${attemptId}`)
      .then((response) => response.json())
      .then((payload) => setData(payload));
  }, [attemptId]);

  if (!data) return <p>Загрузка результатов...</p>;

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-semibold">Общий результат</h2>
        <p className="mt-2 text-3xl font-bold text-indigo-700">{data.score.percentage}%</p>
        <p className="text-sm text-slate-600">Верно: {data.score.correctCount} из {data.score.total}</p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Анализ ошибок и объяснения</h2>
        <div className="mt-3 space-y-2 text-sm">
          {data.score.detailed.map((item) => (
            <div key={item.questionId} className="rounded-xl bg-slate-50 p-3">
              <p className={item.isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                {item.isCorrect ? 'Верно' : 'Ошибка'} · Тема: {item.topic}
              </p>
              <p className="mt-1 text-slate-600">{item.explanation}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">AI-рекомендации</h2>
        <p className="mt-2 text-sm text-slate-700">{data.ai.summary}</p>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
          {data.ai.plan.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
