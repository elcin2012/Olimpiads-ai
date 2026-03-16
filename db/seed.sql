insert into sources (name, base_url, subject, quality_tier)
values
  ('IMO Official Problems', 'https://www.imo-official.org/problems.aspx', 'mathematics', 1),
  ('IPhO Official', 'https://www.ipho-new.org/', 'physics', 1),
  ('IChO Official', 'https://www.icho-official.org', 'chemistry', 1),
  ('IOI', 'https://ioinformatics.org', 'informatics', 1)
on conflict (base_url) do nothing;

insert into problems (subject, topic, difficulty, grade, problem_text, solution_text, answer_text, tags, content_hash)
values
  ('mathematics', 'делимость', 3, 8, 'Докажите, что сумма квадратов двух последовательных целых чисел не делится на 4.', 'Проверяем по модулю 4: n^2 и (n+1)^2 дают остатки 0/1 и 1/0, сумма всегда 1.', 'Не делится на 4.', '{алгебра,теория_чисел}', 'demo-math-1')
on conflict do nothing;
