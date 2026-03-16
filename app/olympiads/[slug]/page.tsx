import { notFound } from 'next/navigation';
import { StartOlympiadButton } from '@/components/olympiads/start-button';
import { olympiads, subjects } from '@/lib/data/mockData';
import { Card } from '@/components/ui/card';

export default function OlympiadPage({ params }: { params: { slug: string } }) {
  const olympiad = olympiads.find((item) => item.slug === params.slug);
  if (!olympiad) return notFound();

  const subject = subjects.find((item) => item.id === olympiad.subjectId);

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-3xl font-bold">{olympiad.title}</h1>
        <p className="mt-2 text-slate-600">{olympiad.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
          <span>Предмет: {subject?.name}</span>
          <span>• Уровень: {olympiad.level}</span>
          <span>• {olympiad.questionsCount} вопросов</span>
          <span>• Таймер: {olympiad.durationMinutes} минут</span>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold">Правила</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
          {olympiad.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <div className="mt-5">
          <StartOlympiadButton olympiadId={olympiad.id} />
        </div>
      </Card>
    </div>
  );
}
