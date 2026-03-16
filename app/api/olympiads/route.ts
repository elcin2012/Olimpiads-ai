import { NextResponse } from 'next/server';
import { olympiads, subjects } from '@/lib/data/mockData';

export async function GET() {
  return NextResponse.json(
    olympiads.map((item) => ({
      ...item,
      subject: subjects.find((subject) => subject.id === item.subjectId)
    }))
  );
}
