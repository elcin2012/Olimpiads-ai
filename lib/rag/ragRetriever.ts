import { getPool } from '@/lib/db/pg';
import { fakeEmbedding } from '@/lib/rag/embedding';
import type { RetrievedProblem, Subject } from '@/types/assistant';

export async function retrieveTopProblems(subject: Subject, topic: string | undefined, limit = 8): Promise<RetrievedProblem[]> {
  const pool = getPool();
  if (!pool) return [];

  const queryEmbedding = fakeEmbedding(topic?.trim() || subject, 1536);
  const embeddingSql = `[${queryEmbedding.join(',')}]`;

  const vectorSql = `
    select p.id, p.subject, p.topic, p.difficulty, p.grade, p.problem_text, p.solution_text, p.answer_text,
           p.input_format, p.output_format, p.constraints, p.examples, p.solution_idea, p.complexity, p.tags
    from problem_embeddings e
    join problems p on p.id = e.problem_id
    where p.subject = $1
    order by e.embedding <=> $2::vector
    limit $3
  `;

  try {
    const { rows } = await pool.query(vectorSql, [subject, embeddingSql, Math.min(10, Math.max(5, limit))]);
    if (rows.length) return rows as RetrievedProblem[];
  } catch {
    // fallback to text query if vector extension is not available yet
  }

  const likeTopic = topic?.trim() ? `%${topic.trim().toLowerCase()}%` : null;
  const fallbackSql = `
    select p.id, p.subject, p.topic, p.difficulty, p.grade, p.problem_text, p.solution_text, p.answer_text,
           p.input_format, p.output_format, p.constraints, p.examples, p.solution_idea, p.complexity, p.tags
    from problems p
    where p.subject = $1
      and ($2::text is null or lower(coalesce(p.topic, '')) like $2 or lower(p.problem_text) like $2)
    order by p.created_at desc
    limit $3
  `;

  const { rows } = await pool.query(fallbackSql, [subject, likeTopic, Math.min(10, Math.max(5, limit))]);
  return rows as RetrievedProblem[];
}
