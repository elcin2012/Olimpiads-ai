import { OlympiadCard } from '@/components/olympiads/olympiad-card';
import { olympiads, subjects } from '@/lib/data/mockData';

export default function OlympiadsCatalogPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h1 className="text-3xl font-bold">Каталог олимпиад</h1>
        <p className="mt-2 text-slate-600">Фильтры: предмет, возраст и уровень сложности (демо-представление).</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {subjects.map((subject) => (
            <span key={subject.id} className={`rounded-full px-3 py-1 ${subject.color}`}>
              {subject.name}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {olympiads.map((item) => (
          <OlympiadCard
            key={item.id}
            olympiad={item}
            subject={subjects.find((subject) => subject.id === item.subjectId)}
          />
        ))}
      </section>
    </div>
  );
}
