# AI Olympiad Platform (Advanced MVP)

Платформа олимпиадной подготовки на Next.js с multi-agent pipeline, RAG-контуром и дешёвой архитектурой.

## Что умеет
- Предметы: mathematics, physics, chemistry, informatics
- Проверка валидности `subject + grade`
- Режимы:
  - SOLVE
  - CREATE
  - VERIFY
  - HINT
  - TOUR
  - SIMILAR
  - THEORY
- Multi-agent оркестрация:
  - SOLVE: Solver → Verifier
  - CREATE: Generator → Solver → Verifier → Difficulty Estimator
  - VERIFY/HINT/SIMILAR: специализированные агенты
- RAG retriever через PostgreSQL (готово к pgvector)
- Admin dashboard:
  - dataset status
  - retrieval tests
  - parser/log view API

## Архитектура
- Frontend/Backend: Next.js App Router + API Routes
- Styling: Tailwind CSS
- DB: PostgreSQL (+ pgvector)
- Deployment: Vercel
- LLM providers:
  - OpenAI-compatible API
  - Ollama-compatible local endpoint

## Быстрый запуск
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Переменные среды
См. `.env.example`.

- `LLM_PROVIDER=openai|ollama`
- OpenAI-compatible:
  - `OPENAI_BASE_URL`
  - `OPENAI_API_KEY`
  - `OPENAI_MODEL`
- Ollama:
  - `OLLAMA_BASE_URL`
  - `OLLAMA_MODEL`
- PostgreSQL:
  - `DATABASE_URL`
  - `PG_SSL=true|false`

## API
### POST `/api/assistant`
```json
{
  "mode": "SOLVE",
  "subject": "mathematics",
  "grade": 8,
  "topic": "комбинаторика",
  "problemText": "...",
  "studentSolution": "..."
}
```

### Response
```json
{
  "subject": "mathematics",
  "grade": 8,
  "mode": "SOLVE",
  "topic": "комбинаторика",
  "retrievedContextCount": 4,
  "result": {
    "idea": "...",
    "steps": ["..."],
    "answer": "...",
    "difficulty": 3,
    "pipeline": [{"agent":"solver","status":"ok","note":"..."}]
  }
}
```

## Dataset ingestion pipeline
Скрипты:
- `scripts/discover_sources.ts`
- `scripts/ingest_source.ts`
- `scripts/normalize_problem.ts`
- `scripts/deduplicate_problems.ts`
- `scripts/build_embeddings.ts`
- `scripts/rebuild_vector_index.ts`

Команды:
```bash
npm run dataset:discover
npm run dataset:ingest -- "Example problem"
npm run dataset:dedupe
npm run dataset:embeddings
npm run dataset:reindex
```

## Список из 50 источников
Вшит в `lib/constants.ts` (`SOURCE_CATALOG`) и доступен через API `/api/admin/sources`.

## База данных
Схема в `db/schema.sql`:
- `sources`
- `problems`
- `problem_embeddings`
- `assistant_requests`

## Deploy (Vercel)
1. Push в GitHub.
2. Import в Vercel.
3. Добавить env-переменные.
4. Deploy.

## Переключение LLM
- `LLM_PROVIDER=openai` → OpenAI-compatible endpoint
- `LLM_PROVIDER=ollama` → локальный Ollama endpoint

Логика выбора: `lib/ai/providerFactory.ts`.
