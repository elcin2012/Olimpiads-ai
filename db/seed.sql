insert into sources (name, base_url, subject, quality_tier)
values
  ('IMO Official Problems', 'https://www.imo-official.org/problems.aspx', 'mathematics', 1),
  ('IPhO Official', 'https://www.ipho-new.org/', 'physics', 1),
  ('IChO Official', 'https://www.icho-official.org', 'chemistry', 1),
  ('IOI', 'https://ioinformatics.org', 'informatics', 1)
on conflict (base_url) do nothing;

insert into problems (subject, topic, difficulty, grade, problem_text, solution_text, answer_text, input_format, output_format, constraints, examples, solution_idea, complexity, tags, content_hash)
values
  ('mathematics', 'number theory', 3, 8, 'Докажите, что сумма квадратов двух последовательных целых чисел не делится на 4.', 'Проверяем по модулю 4, всегда остаток 1.', 'Не делится на 4.', null, null, '{n<=10^9}', '{пример 1}', 'Разбор по модулю', 'O(1)', '{алгебра,теория_чисел}', 'demo-math-1'),
  ('informatics', 'graphs', 3, 9, 'Найдите кратчайший путь в неориентированном графе.', 'Используем BFS от вершины s.', 'Длина кратчайшего пути.', 'n m\nedges', 'distance', '{1<=n<=2e5}', '{input:... output:...}', 'Классический BFS', 'O(n+m)', '{graphs,bfs}', 'demo-info-1')
on conflict do nothing;
