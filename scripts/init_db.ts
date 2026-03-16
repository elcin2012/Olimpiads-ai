import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getPool } from '../lib/db/pg';

async function main() {
  const pool = getPool();
  if (!pool) {
    console.error('DATABASE_URL не задан.');
    process.exit(1);
  }

  const schema = readFileSync(resolve(process.cwd(), 'db/schema.sql'), 'utf8');
  const seed = readFileSync(resolve(process.cwd(), 'db/seed.sql'), 'utf8');

  await pool.query(schema);
  await pool.query(seed);

  const { rows } = await pool.query('select count(*)::int as count from problems');
  console.log(`DB initialized. problems=${rows[0]?.count ?? 0}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
