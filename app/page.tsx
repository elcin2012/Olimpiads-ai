import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Олимпиадный AI ассистент</h1>
      <p className="mt-3 text-slate-700">
        MVP для генерации задач, проверки решений и выдачи подсказок по математике, физике, химии и информатике.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/workspace" className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          Перейти в рабочую зону
        </Link>
        <Link href="/admin" className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100">
          Открыть debug страницу
        </Link>
      </div>
    </section>
  );
}
