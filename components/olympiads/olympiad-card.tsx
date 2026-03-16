import Link from 'next/link';
import { Olympiad, Subject } from '@/lib/domain/types';
import { Card } from '@/components/ui/card';

export function OlympiadCard({ olympiad, subject }: { olympiad: Olympiad; subject?: Subject }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{olympiad.title}</h3>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{olympiad.level}</span>
      </div>
      <p className="text-sm text-slate-600">{olympiad.description}</p>
      <div className="flex flex-wrap gap-2 text-xs text-slate-500">
        <span>{subject?.name}</span>
        <span>• {olympiad.ageGroup}</span>
        <span>• {olympiad.questionsCount} задач</span>
        <span>• {olympiad.durationMinutes} мин</span>
      </div>
      <Link href={`/olympiads/${olympiad.slug}`} className="mt-2 inline-block rounded-xl bg-indigo-600 px-3 py-2 text-center text-sm text-white hover:bg-indigo-700">
        Начать
      </Link>
    </Card>
  );
}
