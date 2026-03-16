'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '@/lib/domain/types';
import { Button } from '@/components/ui/button';

export function AttemptRunner({ attemptId, questions }: { attemptId: string; questions: Question[] }) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[current];
  const progress = useMemo(() => Math.round(((current + 1) / questions.length) * 100), [current, questions.length]);

  async function finish() {
    const answerList = Object.entries(answers).map(([questionId, selectedOptionId]) => ({ questionId, selectedOptionId }));

    await fetch('/api/attempt/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attemptId, answers: answerList })
    });

    router.push(`/results/${attemptId}`);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Прогресс: {progress}%</span>
        <span>Вопрос {current + 1} / {questions.length}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${progress}%` }} />
      </div>
      <h2 className="text-xl font-semibold">{question.prompt}</h2>
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`w-full rounded-xl border p-3 text-left ${answers[question.id] === option.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}
            onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option.id }))}
          >
            {option.text}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => setCurrent((v) => Math.max(v - 1, 0))}>Назад</Button>
        {current < questions.length - 1 ? (
          <Button onClick={() => setCurrent((v) => Math.min(v + 1, questions.length - 1))}>Далее</Button>
        ) : (
          <Button onClick={finish}>Завершить</Button>
        )}
      </div>
    </div>
  );
}
