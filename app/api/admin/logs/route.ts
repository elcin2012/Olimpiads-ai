import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db/pg';

export async function GET() {
  const pool = getPool();
  if (!pool) return NextResponse.json({ rows: [] });

  const { rows } = await pool.query(
    'select id, mode, subject, grade, topic, created_at from assistant_requests order by created_at desc limit 20'
  );
  return NextResponse.json({ rows });
}
