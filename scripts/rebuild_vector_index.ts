import { getPool } from '../lib/db/pg';

async function main() {
  const pool = getPool();
  if (!pool) {
    console.log('DATABASE_URL не задан.');
    return;
  }

  await pool.query('reindex index if exists idx_problem_embeddings_ivfflat');
  console.log('Vector index reindexed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
