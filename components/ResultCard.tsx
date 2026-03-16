import type { AssistantResponse } from '@/types/assistant';

type ResultCardProps = {
  data: AssistantResponse | null;
};

export function ResultCard({ data }: ResultCardProps) {
  if (!data) {
    return <div className="rounded-xl border border-dashed border-slate-300 p-4 text-slate-500">Результат появится здесь.</div>;
  }

  return (
    <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <div className="grid gap-2 text-sm sm:grid-cols-2">
        <p><strong>Предмет:</strong> {data.subject}</p>
        <p><strong>Класс:</strong> {data.grade}</p>
        <p><strong>Режим:</strong> {data.mode}</p>
        <p><strong>Тема:</strong> {data.topic}</p>
        <p><strong>RAG-контекст:</strong> {data.retrievedContextCount}</p>
      </div>
      <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">{JSON.stringify(data.result, null, 2)}</pre>
    </div>
  );
}
