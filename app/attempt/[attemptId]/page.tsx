import { AttemptRunner } from '@/components/attempt/attempt-runner';
import { questions } from '@/lib/data/mockData';

export default function AttemptPage({ params }: { params: { attemptId: string } }) {
  const olympiadQuestions = questions.filter((question) => question.olympiadId === 'olymp-1');

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Прохождение олимпиады</h1>
      <p className="text-sm text-slate-600">Таймер и автосохранение ответов включены в демо-режиме интерфейса.</p>
      <AttemptRunner attemptId={params.attemptId} questions={olympiadQuestions} />
    </div>
  );
}
