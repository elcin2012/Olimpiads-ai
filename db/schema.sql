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
