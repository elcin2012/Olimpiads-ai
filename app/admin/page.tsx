'use client';

import { useState } from 'react';
import { MODES, SUBJECTS, type AssistantMode, type Subject } from '@/types/assistant';

export default function AdminPage() {
  const [mode, setMode] = useState<AssistantMode>('SOLVE');
  const [subject, setSubject] = useState<Subject>('mathematics');
  const [grade, setGrade] = useState(7);
  const [topic, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');

  const buildPrompt = async () => {
    const res = await fetch('/api/debug/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, subject, grade, topic })
    });
    const data = await res.json();
    setPrompt(data.prompt ?? data.error ?? '');
  };

  return (
    <section className="rounded-xl bg-white p-4 shadow-sm">
      <h1 className="text-xl font-semibold">Debug: тест промптов</h1>
      <div className="mt-3 grid gap-3 md:grid-cols-4">
        <select className="rounded-lg border p-2" value={mode} onChange={(e) => setMode(e.target.value as AssistantMode)}>{MODES.map((m) => <option key={m}>{m}</option>)}</select>
        <select className="rounded-lg border p-2" value={subject} onChange={(e) => setSubject(e.target.value as Subject)}>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select>
        <input className="rounded-lg border p-2" type="number" value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
        <input className="rounded-lg border p-2" placeholder="Тема" value={topic} onChange={(e) => setTopic(e.target.value)} />
      </div>
      <button className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-white" onClick={buildPrompt}>Собрать промпт</button>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-100 p-3 text-xs">{prompt || 'Промпт появится здесь'}</pre>
    </section>
  );
}
