'use client';

import { useState } from 'react';
import { ResultCard } from '@/components/ResultCard';
import { Toast } from '@/components/Toast';
import { modeLabels, subjectLabels } from '@/lib/constants';
import { MODES, SUBJECTS, type AssistantMode, type AssistantResponse, type Subject } from '@/types/assistant';

type FormState = {
  mode: AssistantMode;
  subject: Subject;
  grade: number;
  topic: string;
  problemText: string;
  studentSolution: string;
};

const initialState: FormState = {
  mode: 'SOLVE',
  subject: 'mathematics',
  grade: 7,
  topic: '',
  problemText: '',
  studentSolution: ''
};

export default function WorkspacePage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [result, setResult] = useState<AssistantResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const run = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? 'Ошибка запроса');
      }
      setResult(data);
      setToast('Готово! Ответ получен.');
    } catch (error) {
      setToast(error instanceof Error ? error.message : 'Ошибка');
    } finally {
      setLoading(false);
      setTimeout(() => setToast(''), 1800);
    }
  };

  const copyResult = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setToast('Результат скопирован');
    setTimeout(() => setToast(''), 1200);
  };

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold">Рабочая зона</h1>

        <label className="block text-sm">Предмет
          <select className="mt-1 w-full rounded-lg border p-2" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value as Subject })}>
            {SUBJECTS.map((s) => <option key={s} value={s}>{subjectLabels[s]}</option>)}
          </select>
        </label>

        <label className="block text-sm">Класс
          <input type="number" min={1} max={11} className="mt-1 w-full rounded-lg border p-2" value={form.grade} onChange={(e) => setForm({ ...form, grade: Number(e.target.value) })} />
        </label>

        <label className="block text-sm">Режим
          <select className="mt-1 w-full rounded-lg border p-2" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value as AssistantMode })}>
            {MODES.map((m) => <option key={m} value={m}>{modeLabels[m]}</option>)}
          </select>
        </label>

        <label className="block text-sm">Тема
          <input className="mt-1 w-full rounded-lg border p-2" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Например, комбинаторика" />
        </label>

        <label className="block text-sm">Текст задачи
          <textarea className="mt-1 min-h-24 w-full rounded-lg border p-2" value={form.problemText} onChange={(e) => setForm({ ...form, problemText: e.target.value })} />
        </label>

        <label className="block text-sm">Решение ученика
          <textarea className="mt-1 min-h-24 w-full rounded-lg border p-2" value={form.studentSolution} onChange={(e) => setForm({ ...form, studentSolution: e.target.value })} />
        </label>

        <div className="flex flex-wrap gap-2">
          <button onClick={run} disabled={loading} className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-60">{loading ? 'Генерируем...' : 'Запустить'}</button>
          <button onClick={run} disabled={loading || !result} className="rounded-lg border px-4 py-2">Сгенерировать заново</button>
          <button onClick={copyResult} disabled={!result} className="rounded-lg border px-4 py-2">Копировать результат</button>
        </div>
      </div>

      <ResultCard data={result} />
      <Toast text={toast} />
    </section>
  );
}
