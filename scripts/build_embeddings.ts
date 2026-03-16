import { getPool } from '../lib/db/pg';
import { fakeEmbedding } from '../lib/rag/embedding';

async function main() {
  const pool = getPool();
  if (!pool) {
    console.log('DATABASE_URL не задан.');
    return;
  }

  const { rows } = await pool.query('select id, problem_text from problems order by id desc limit 200');

  for (const row of rows) {
    const emb = fakeEmbedding(row.problem_text, 1536);
    await pool.query(
      `insert into problem_embeddings(problem_id, embedding)
       values ($1, $2)
       on conflict (problem_id) do update set embedding = excluded.embedding`,
      [row.id, `[${emb.join(',')}]`]
    );
  }

  console.log(`Embeddings rebuilt: ${rows.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
