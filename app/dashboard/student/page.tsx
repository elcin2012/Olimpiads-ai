import { Card } from '@/components/ui/card';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { studentPerformance } from '@/lib/data/mockData';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Кабинет ученика</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm text-slate-500">Средний балл</p><p className="text-2xl font-bold">78%</p></Card>
        <Card><p className="text-sm text-slate-500">Попыток</p><p className="text-2xl font-bold">14</p></Card>
        <Card><p className="text-sm text-slate-500">Достижения</p><p className="text-2xl font-bold">6</p></Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold">Прогресс по неделям</h2>
        <div className="mt-3">
          <ProgressChart data={studentPerformance} />
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Рекомендованные задания</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
          <li>Алгебра: квадратные уравнения (10 задач)</li>
          <li>Физика: кинематика, базовый уровень (8 задач)</li>
          <li>Информатика: массивы и бинарный поиск (12 задач)</li>
        </ul>
      </Card>
    </div>
  );
}
