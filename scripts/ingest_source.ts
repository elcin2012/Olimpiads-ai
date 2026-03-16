import { createHash } from 'crypto';
import { getPool } from '../lib/db/pg';

function normalizeWhitespace(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

async function main() {
  const pool = getPool();
  if (!pool) {
    console.log('DATABASE_URL не задан. Dry-run режим.');
    return;
  }

  const problemText = normalizeWhitespace(process.argv.slice(2).join(' ') || 'Demo olympiad problem');
  const contentHash = createHash('sha256').update(problemText.toLowerCase()).digest('hex');

  await pool.query(
    `insert into problems (subject, topic, difficulty, grade, problem_text, content_hash)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (content_hash) do nothing`,
    ['mathematics', 'demo', 2, 8, problemText, contentHash]
  );

  console.log('Ingest complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
