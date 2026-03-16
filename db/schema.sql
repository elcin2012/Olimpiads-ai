create extension if not exists vector;

create table if not exists sources (
  id bigserial primary key,
  name text not null,
  base_url text not null unique,
  subject text not null,
  quality_tier int not null default 3,
  created_at timestamptz default now()
);

create table if not exists problems (
  id bigserial primary key,
  subject text not null,
  topic text,
  difficulty int,
  grade int,
  problem_text text not null,
  solution_text text,
  answer_text text,
  source_id bigint references sources(id) on delete set null,
  tags text[],
  content_hash text,
  created_at timestamptz default now()
);

create unique index if not exists idx_problems_content_hash on problems(content_hash) where content_hash is not null;
create index if not exists idx_problems_subject_topic on problems(subject, topic);

create table if not exists problem_embeddings (
  problem_id bigint primary key references problems(id) on delete cascade,
  embedding vector(1536) not null,
  created_at timestamptz default now()
);

create index if not exists idx_problem_embeddings_ivfflat
  on problem_embeddings using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create table if not exists assistant_requests (
  id bigserial primary key,
  mode text not null,
  subject text not null,
  grade int not null,
  topic text,
  input_text text,
  output_text text,
  created_at timestamptz default now()
);
