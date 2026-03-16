import { AiProblemGenerator } from '@/components/dashboard/ai-problem-generator';
import { Card } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Админ-панель</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm text-slate-500">Пользователи</p><p className="text-2xl font-bold">1 248</p></Card>
        <Card><p className="text-sm text-slate-500">Олимпиады</p><p className="text-2xl font-bold">36</p></Card>
        <Card><p className="text-sm text-slate-500">Попытки сегодня</p><p className="text-2xl font-bold">482</p></Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold">CRUD: олимпиады и задания</h2>
        <p className="mt-2 text-sm text-slate-600">В боевой версии здесь используются server actions + Prisma для create/update/delete.</p>
        <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
          <p>• Создание предметов и тем</p>
          <p>• Редактирование олимпиад</p>
          <p>• Управление вопросами и пользователями</p>
        </div>
      </Card>

      <AiProblemGenerator />
    </div>
  );
}
