import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">AI Olympiad Platform</h1>
      <p className="text-slate-700">
        Модульная платформа для подготовки к олимпиадам по математике, физике, химии и информатике.
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
        <li>7 режимов: SOLVE, CREATE, VERIFY, HINT, TOUR, SIMILAR, THEORY</li>
        <li>Multi-agent pipeline: Solver → Verifier, Generator → Solver → Verifier</li>
        <li>RAG-ready retriever через PostgreSQL/pgvector</li>
      </ul>
      <div className="flex flex-wrap gap-3">
        <Link href="/workspace" className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Открыть рабочую зону</Link>
        <Link href="/admin" className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100">Admin Dashboard</Link>
      </div>
    </section>
  );
}
