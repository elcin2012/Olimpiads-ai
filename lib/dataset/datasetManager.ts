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
