import { getPool } from '../lib/db/pg';

async function main() {
  const pool = getPool();
  if (!pool) {
    console.log('DATABASE_URL не задан.');
    return;
  }

  const sql = `
    delete from problems p
    using problems p2
    where p.id > p2.id
      and p.content_hash is not null
      and p.content_hash = p2.content_hash
  `;

  const result = await pool.query(sql);
  console.log(`Удалено дублей: ${result.rowCount ?? 0}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
