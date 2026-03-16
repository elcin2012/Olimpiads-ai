import { createHash } from 'crypto';
import { getPool } from '../lib/db/pg';

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

function buildTemplate(index: number) {
  return `Олимпиадная демо-задача #${index}: Докажите или вычислите требуемое выражение.`;
}

async function main() {
  const pool = getPool();
  if (!pool) {
    console.log('DATABASE_URL не задан. Dry-run режим.');
    return;
  }

  const target = Number(process.env.SEED_TARGET ?? 100);
  for (let i = 1; i <= target; i += 1) {
    const problemText = normalizeWhitespace(buildTemplate(i));
    const contentHash = createHash('sha256').update(problemText.toLowerCase()).digest('hex');

    await pool.query(
      `insert into problems (subject, topic, difficulty, grade, problem_text, solution_text, answer_text, content_hash)
       values ($1, $2, $3, $4, $5, $6, $7, $8)
       on conflict (content_hash) do nothing`,
      ['mathematics', 'algebra', 2 + (i % 4), 7 + (i % 4), problemText, 'Демо-решение', 'Демо-ответ', contentHash]
    );
  }

  console.log(`Ingest complete. Target=${target}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
