import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db/pg';

export async function GET() {
  const pool = getPool();
  if (!pool) {
    return NextResponse.json({ requests: 0, problems: 0, sources: 0, note: 'DATABASE_URL не задан' });
  }

  const [r, p, s] = await Promise.all([
    pool.query('select count(*)::int as count from assistant_requests'),
    pool.query('select count(*)::int as count from problems'),
    pool.query('select count(*)::int as count from sources')
  ]);

  return NextResponse.json({
    requests: r.rows[0].count,
    problems: p.rows[0].count,
    sources: s.rows[0].count
  });
}
