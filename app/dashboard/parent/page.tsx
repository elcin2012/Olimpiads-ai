import { Card } from '@/components/ui/card';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { studentPerformance } from '@/lib/data/mockData';

export default function ParentDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Кабинет родителя</h1>
      <Card>
        <h2 className="text-lg font-semibold">Привязанные дети</h2>
        <p className="mt-2 text-sm text-slate-600">Иван Петров · 8 класс · Математика/Физика</p>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Прогресс по месяцам</h2>
        <div className="mt-3">
          <ProgressChart data={studentPerformance} />
        </div>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Сильные и слабые стороны</h2>
        <p className="mt-2 text-sm text-slate-600">Сильные: логика, уравнения. Зоны роста: геометрия и задачи на движение.</p>
      </Card>
    </div>
  );
}
