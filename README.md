# AI Olympiad Platform (Stable MVP)

Стабильный MVP для олимпиадной подготовки по математике, физике, химии и информатике.

## Что исправлено
- Починена генерация задач: если LLM недоступна/ошиблась, включается локальный fallback-генератор.
- Решена проблема «нет данных в БД»: добавлен `npm run db:init` + авто-дозаполнение минимального датасета при запуске API.

## Возможности
- Режимы: `SOLVE`, `CREATE`, `VERIFY`, `HINT`, `TOUR`, `SIMILAR`, `THEORY`
- Проверка ограничений предмет/класс
- Multi-agent pipeline:
  - SOLVE: Solver → Verifier
  - CREATE: Retriever → Generator → Solver → Verifier → Difficulty Estimator
- RAG через PostgreSQL + pgvector (с fallback на text search)
- Строгие JSON-ответы и серверная нормализация результата
- Rate limit, request cache, timeout/retry для LLM-вызовов
- Admin dashboard: dataset status, retrieval test, logs API

## Стек
- Next.js + Tailwind
- PostgreSQL + pgvector
- OpenAI-compatible API или Ollama

## Запуск локально
```bash
npm install
cp .env.example .env.local
npm run db:init
npm run dev
```

Открыть:
- `http://localhost:3000` — рабочая зона
- `http://localhost:3000/admin` — админ-панель

## .env
См. `.env.example`:
- LLM: `LLM_PROVIDER`, `OPENAI_*`, `OLLAMA_*`
- DB: `DATABASE_URL`, `PG_SSL`
- Performance: `LLM_TIMEOUT_MS`, `LLM_RETRIES`, `REQUEST_CACHE_TTL_MS`
- Ingestion: `SEED_TARGET`

## Схема БД
Таблицы:
- `sources`
- `problems`
- `problem_embeddings`
- `assistant_requests`

Поля информатики поддержаны в `problems`:
`input_format`, `output_format`, `constraints`, `examples`, `solution_idea`, `complexity`.

## Инициализация БД
```bash
npm run db:init
```

## Data ingestion pipeline
Скрипты:
- `discover_sources.ts`
- `ingest_source.ts`
- `normalize_problem.ts`
- `deduplicate_problems.ts`
- `build_embeddings.ts`
- `rebuild_vector_index.ts`

Команды:
```bash
npm run dataset:discover
SEED_TARGET=100 npm run dataset:ingest
SEED_TARGET=1000 npm run dataset:ingest
npm run dataset:dedupe
npm run dataset:embeddings
npm run dataset:reindex
```

## API
`POST /api/assistant`
```json
{
  "mode": "CREATE",
  "subject": "mathematics",
  "grade": 8,
  "topic": "algebra",
  "problemText": "...",
  "studentSolution": "..."
}
```

## Деплой (Vercel)
1. Push в GitHub.
2. Import в Vercel.
3. Добавить переменные окружения из `.env.example`.
4. Deploy.

## Переключение провайдера
- OpenAI-compatible: `LLM_PROVIDER=openai`
- Ollama: `LLM_PROVIDER=ollama`
