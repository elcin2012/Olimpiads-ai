import { NextResponse } from 'next/server';
import { SOURCE_CATALOG } from '@/lib/constants';

export async function GET() {
  return NextResponse.json({ total: SOURCE_CATALOG.length, sources: SOURCE_CATALOG });
}
