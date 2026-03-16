import { getPool } from '@/lib/db/pg';
import type { RetrievedProblem, Subject } from '@/types/assistant';

export async function retrieveTopProblems(subject: Subject, topic: string | undefined, limit = 10): Promise<RetrievedProblem[]> {
  const pool = getPool();
  if (!pool) return [];

  const likeTopic = topic?.trim() ? `%${topic.trim().toLowerCase()}%` : null;

  const sql = `
    select p.id, p.subject, p.topic, p.difficulty, p.grade, p.problem_text, p.solution_text, p.answer_text, p.tags
    from problems p
    where p.subject = $1
      and ($2::text is null or lower(coalesce(p.topic, '')) like $2 or lower(p.problem_text) like $2)
    order by p.created_at desc
    limit $3
  `;

  const { rows } = await pool.query(sql, [subject, likeTopic, limit]);
  return rows as RetrievedProblem[];
}
