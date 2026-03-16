'use client';

import { useEffect, useState } from 'react';
import { MODES, SUBJECTS, type AssistantMode, type Subject } from '@/types/assistant';

type Stats = { requests: number; problems: number; sources: number; note?: string };
type LogRow = { id: number; mode: string; subject: string; grade: number; topic: string | null; created_at: string };

export default function AdminPage() {
  const [mode, setMode] = useState<AssistantMode>('SOLVE');
  const [subject, setSubject] = useState<Subject>('mathematics');
  const [grade, setGrade] = useState(8);
  const [topic, setTopic] = useState('');
  const [prompt, setPrompt] = useState('');
  const [stats, setStats] = useState<Stats>({ requests: 0, problems: 0, sources: 0 });
  const [retrieval, setRetrieval] = useState('');
  const [logs, setLogs] = useState<LogRow[]>([]);

  useEffect(() => {
    fetch('/api/admin/stats').then((r) => r.json()).then(setStats).catch(() => undefined);
    fetch('/api/admin/logs').then((r) => r.json()).then((d) => setLogs(d.rows ?? [])).catch(() => undefined);
  }, []);

  const buildPrompt = async () => {
    const res = await fetch('/api/debug/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, subject, grade, topic, problemText: 'Демо задача' })
    });
    const data = await res.json();
    setPrompt(data.prompt ?? data.error ?? '');
  };

  const testRetrieval = async () => {
    const res = await fetch(`/api/admin/retrieval?subject=${subject}&topic=${encodeURIComponent(topic)}`);
    const data = await res.json();
    setRetrieval(JSON.stringify(data, null, 2));
  };

  return (
    <section className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Запросы</p><p className="text-2xl font-semibold">{stats.requests}</p></article>
        <article className="rounded-xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Задачи в БД</p><p className="text-2xl font-semibold">{stats.problems}</p></article>
        <article className="rounded-xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Источники</p><p className="text-2xl font-semibold">{stats.sources}</p></article>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold">Admin: prompt и retrieval тесты</h1>
        {stats.note ? <p className="mt-1 text-sm text-amber-700">{stats.note}</p> : null}
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <select className="rounded-lg border p-2" value={mode} onChange={(e) => setMode(e.target.value as AssistantMode)}>{MODES.map((m) => <option key={m}>{m}</option>)}</select>
          <select className="rounded-lg border p-2" value={subject} onChange={(e) => setSubject(e.target.value as Subject)}>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select>
          <input className="rounded-lg border p-2" type="number" value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
          <input className="rounded-lg border p-2" placeholder="Тема" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>
        <div className="mt-3 flex gap-2">
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-white" onClick={buildPrompt}>Собрать промпт</button>
          <button className="rounded-lg border px-4 py-2" onClick={testRetrieval}>Тест retrieval</button>
        </div>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-100 p-3 text-xs">{prompt || 'Промпт появится здесь'}</pre>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-100 p-3 text-xs">{retrieval || 'Результат retrieval появится здесь'}</pre>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Последние запросы</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {logs.map((l) => <li key={l.id}>#{l.id} {l.mode} / {l.subject} / {l.grade} / {l.topic ?? '—'}</li>)}
          {!logs.length ? <li className="text-slate-500">Логи отсутствуют</li> : null}
        </ul>
      </div>
    </section>
  );
}
