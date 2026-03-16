# Олимпиадный AI ассистент (MVP)

MVP веб-приложение на Next.js + Tailwind для олимпиадных задач.

## Возможности
- 5 режимов: `SOLVE`, `CREATE`, `CHECK`, `HINT`, `TOUR`
- Предметы: математика, физика, химия, информатика
- Проверка ограничений класс/предмет на backend
- Абстракция LLM-провайдеров: OpenAI-compatible и Ollama
- API: `/api/assistant`
- Простая debug-страница для теста промптов

## Стек
- Next.js (App Router)
- Tailwind CSS
- API routes (встроенный backend)
- PostgreSQL/Supabase-ready схема
- Деплой: Vercel

## Быстрый старт локально
1. Установите зависимости:
   ```bash
   npm install
   ```
2. Создайте env:
   ```bash
   cp .env.example .env.local
   ```
3. Укажите ключи/URL провайдера в `.env.local`.
4. Запустите:
   ```bash
   npm run dev
   ```
5. Откройте `http://localhost:3000`.

## Переменные окружения
- `LLM_PROVIDER=openai|ollama`
- OpenAI-compatible:
  - `OPENAI_BASE_URL`
  - `OPENAI_API_KEY`
  - `OPENAI_MODEL`
- Ollama:
  - `OLLAMA_BASE_URL`
  - `OLLAMA_MODEL`
- Опционально: `DATABASE_URL`

## Как переключить провайдера
- Для OpenAI-compatible:
  - `LLM_PROVIDER=openai`
- Для Ollama:
  - `LLM_PROVIDER=ollama`

Логика переключения в `lib/ai/providerFactory.ts`.

## API контракт
`POST /api/assistant`
```json
{
  "mode": "SOLVE",
  "subject": "mathematics",
  "grade": 7,
  "topic": "комбинаторика",
  "problemText": "...",
  "studentSolution": "..."
}
```

Ответ:
```json
{
  "subject": "mathematics",
  "grade": 7,
  "mode": "SOLVE",
  "topic": "комбинаторика",
  "result": {
    "idea": "...",
    "steps": ["..."],
    "answer": "...",
    "difficulty": 3,
    "hints": ["...", "..."]
  }
}
```

## Деплой в Vercel
1. Push репозиторий на GitHub.
2. Import проекта в Vercel.
3. Добавьте переменные окружения из `.env.example`.
4. Нажмите Deploy.

## Бюджетная архитектура
- Один Next.js сервис (frontend + backend)
- LLM только по API (или локально через Ollama)
- БД опциональна (для логов)
- Основные затраты: Vercel + LLM usage + storage
