# olimpiads.ai

Современная образовательная веб-платформа для школьных онлайн-олимпиад с AI-аналитикой, рекомендациями и кабинетами для ученика, родителя и администратора.

## 1) Структура проекта

```bash
.
├── app/
│   ├── page.tsx
│   ├── olympiads/page.tsx
│   ├── olympiads/[slug]/page.tsx
│   ├── attempt/[attemptId]/page.tsx
│   ├── results/[attemptId]/page.tsx
│   ├── dashboard/student/page.tsx
│   ├── dashboard/parent/page.tsx
│   ├── admin/page.tsx
│   └── api/
│       ├── olympiads/route.ts
│       ├── attempt/start/route.ts
│       ├── attempt/submit/route.ts
│       ├── attempt/[attemptId]/route.ts
│       └── ai/
│           ├── recommendations/route.ts
│           └── generate-problem/route.ts
├── components/
│   ├── ui/
│   ├── olympiads/
│   ├── attempt/
│   ├── results/
│   └── dashboard/
├── lib/
│   ├── data/mockData.ts
│   ├── domain/
│   │   ├── types.ts
│   │   ├── scoring.ts
│   │   └── attemptStore.ts
│   └── ai/educationAi.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── .env.example
```

## 2) Prisma schema

Полная схема в `prisma/schema.prisma`.

Включает:
- роли пользователей: `STUDENT`, `PARENT`, `ADMIN`
- предметы, темы, олимпиады, вопросы
- попытки, ответы, AI-insight по слабым темам
- связи родитель ↔ ребенок

## 3) Основные страницы

- Главная: `app/page.tsx`
- Каталог олимпиад: `app/olympiads/page.tsx`
- Детали олимпиады: `app/olympiads/[slug]/page.tsx`
- Прохождение теста: `app/attempt/[attemptId]/page.tsx`
- Результаты с AI-разбором: `app/results/[attemptId]/page.tsx`
- Кабинеты: ученик/родитель/админ

## 4) UI-компоненты

- базовые UI: `components/ui/card.tsx`, `components/ui/button.tsx`
- карточка олимпиады: `components/olympiads/olympiad-card.tsx`
- раннер теста: `components/attempt/attempt-runner.tsx`
- блок результатов: `components/results/result-summary.tsx`
- график прогресса: `components/dashboard/progress-chart.tsx`
- AI генератор задачи для админа: `components/dashboard/ai-problem-generator.tsx`

## 5) Backend/API и server logic

- старт попытки: `POST /api/attempt/start`
- отправка ответов и подсчет: `POST /api/attempt/submit`
- получение результатов: `GET /api/attempt/:attemptId`
- AI рекомендации: `POST /api/ai/recommendations`
- AI генерация задач: `POST /api/ai/generate-problem`

Логика подсчета вынесена в `lib/domain/scoring.ts`.

## 6) AI-модуль

`lib/ai/educationAi.ts`:
- `buildAiRecommendations` — анализ слабых тем + план подготовки
- `generateAiProblem` — генерация задачи в нужном JSON-формате

Формат AI-задачи:

```json
{
  "problem_text": "string",
  "options": ["A", "B", "C", "D"],
  "correct_answer": "string",
  "explanation": "string",
  "topic": "string",
  "difficulty": 1
}
```

## 7) Seed-данные

Файл `prisma/seed.ts` создает:
- администратора
- предмет и тему
- олимпиаду
- пример вопроса

## 8) Запуск проекта

```bash
npm install
cp .env.example .env
npm run dev
```

Для Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

Открыть: `http://localhost:3000`

---

## Roadmap production

- Подключить NextAuth/Clerk для полноценной auth
- Перевести in-memory attempt store в PostgreSQL + Prisma
- Добавить real-time таймер и защиту от переключения вкладок
- Интегрировать OpenAI API для реальной генерации и объяснений
- Добавить unit/e2e тесты
