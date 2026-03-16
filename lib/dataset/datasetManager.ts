import { createHash } from 'crypto';
import { SOURCE_CATALOG } from '@/lib/constants';
import { getPool } from '@/lib/db/pg';

export async function syncSourceCatalog(): Promise<number> {
  const pool = getPool();
  if (!pool) return 0;

  let inserted = 0;
  for (const src of SOURCE_CATALOG) {
    const result = await pool.query(
      `insert into sources(name, base_url, subject, quality_tier)
       values ($1, $2, $3, $4)
       on conflict (base_url) do nothing`,
      [src.name, src.base_url, src.subject, 3]
    );
    inserted += result.rowCount ?? 0;
  }

  return inserted;
}

export async function ensureMinimumDataset(minCount = 20): Promise<number> {
  const pool = getPool();
  if (!pool) return 0;

  await syncSourceCatalog();

  const { rows } = await pool.query('select count(*)::int as count from problems');
  const count = rows[0]?.count ?? 0;
  if (count >= minCount) return count;

  const sourceRow = await pool.query("select id from sources where subject = 'mathematics' order by id asc limit 1");
  const sourceId = sourceRow.rows[0]?.id ?? null;

  const need = minCount - count;
  for (let i = 1; i <= need; i += 1) {
    const problemText = `Демо-задача ${count + i}: докажите простое утверждение по алгебре.`;
    const hash = createHash('sha256').update(problemText).digest('hex');

    await pool.query(
      `insert into problems(subject, topic, difficulty, grade, problem_text, solution_text, answer_text, source_id, content_hash)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       on conflict (content_hash) do nothing`,
      ['mathematics', 'algebra', 2 + ((count + i) % 3), 7, problemText, 'Демо-решение', 'Демо-ответ', sourceId, hash]
    );
  }

  const after = await pool.query('select count(*)::int as count from problems');
  return after.rows[0]?.count ?? minCount;
}
