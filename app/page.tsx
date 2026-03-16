import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { subjects } from '@/lib/data/mockData';

const steps = [
  'Регистрируйтесь как ученик, родитель или администратор',
  'Выбирайте предмет и формат олимпиады',
  'Решайте задачи онлайн с таймером и автосохранением',
  'Получайте балл, разбор ошибок и AI-рекомендации'
];

const faq = [
  { q: 'Можно ли проходить олимпиады повторно?', a: 'Да, система сохраняет историю попыток и динамику прогресса.' },
  { q: 'Как родитель получает доступ?', a: 'В кабинете родителя можно привязать профиль ребенка по коду.' },
  { q: 'Есть ли AI-помощник?', a: 'Да, AI анализирует ошибки, объясняет решения и рекомендует темы.' }
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white">
        <p className="text-sm uppercase tracking-widest">EdTech платформа нового поколения</p>
        <h1 className="mt-3 text-4xl font-bold">olimpiads.ai — онлайн-олимпиады с AI-аналитикой</h1>
        <p className="mt-4 max-w-2xl text-indigo-100">
          Подготовка школьников к олимпиадам через персонализированные тесты, объяснения решений и рекомендации по слабым темам.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/olympiads" className="rounded-xl bg-white px-4 py-2 font-medium text-indigo-700">Выбрать олимпиаду</Link>
          <Link href="/dashboard/student" className="rounded-xl border border-white/60 px-4 py-2">Личный кабинет</Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {subjects.map((subject) => (
          <Card key={subject.id}>
            <h3 className="font-semibold">{subject.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{subject.gradeRange}</p>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">Как это работает</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {steps.map((step, i) => (
            <Card key={step}>
              <p className="text-sm text-indigo-600">Шаг {i + 1}</p>
              <p className="mt-1 font-medium">{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold">Для родителей</h2>
          <p className="mt-2 text-sm text-slate-600">
            Отслеживайте прогресс ребенка, получайте отчеты по сильным и слабым темам и персональные рекомендации для подготовки.
          </p>
          <Link href="/dashboard/parent" className="mt-4 inline-block text-sm font-medium text-indigo-700">Перейти в кабинет родителя →</Link>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Преимущества</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Автоматическая проверка ответов</li>
            <li>AI-анализ ошибок и рекомендации</li>
            <li>Прогресс по неделям и достижения</li>
            <li>Админ-панель с генерацией задач</li>
          </ul>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">FAQ</h2>
        <div className="space-y-3">
          {faq.map((item) => (
            <Card key={item.q}>
              <h3 className="font-medium">{item.q}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.a}</p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
        © {new Date().getFullYear()} olimpiads.ai · Онлайн-платформа для подготовки к олимпиадам.
      </footer>
    </div>
  );
}
