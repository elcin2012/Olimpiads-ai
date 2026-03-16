import type { AssistantMode, Subject } from '@/types/assistant';

export const subjectGradeMap: Record<Subject, [number, number]> = {
  mathematics: [1, 11],
  physics: [7, 11],
  chemistry: [8, 11],
  informatics: [5, 11]
};

export const subjectLabels: Record<Subject, string> = {
  mathematics: 'Математика',
  physics: 'Физика',
  chemistry: 'Химия',
  informatics: 'Информатика'
};

export const modeLabels: Record<AssistantMode, string> = {
  SOLVE: 'Решение',
  CREATE: 'Генерация задачи',
  VERIFY: 'Проверка решения',
  HINT: 'Подсказки',
  TOUR: 'Тренировочный набор',
  SIMILAR: 'Похожие задачи',
  THEORY: 'Теория'
};

export const SOURCE_CATALOG = [
  { name: 'IMO Official Problems', base_url: 'https://www.imo-official.org/problems.aspx', subject: 'mathematics' },
  { name: 'AoPS Olympiad Archive', base_url: 'https://artofproblemsolving.com/wiki/index.php/Olympiad_Archive', subject: 'mathematics' },
  { name: 'AoPS Math Contest Problems', base_url: 'https://artofproblemsolving.com/wiki/index.php/Category:Math_Contest_Problems', subject: 'mathematics' },
  { name: 'AMC Problems and Solutions', base_url: 'https://artofproblemsolving.com/wiki/index.php/AMC_Problems_and_Solutions', subject: 'mathematics' },
  { name: 'AIME Problems and Solutions', base_url: 'https://artofproblemsolving.com/wiki/index.php/AIME_Problems_and_Solutions', subject: 'mathematics' },
  { name: 'IMO Problems and Solutions (AoPS)', base_url: 'https://artofproblemsolving.com/wiki/index.php/IMO_Problems_and_Solutions', subject: 'mathematics' },
  { name: 'Math Competitions List', base_url: 'https://artofproblemsolving.com/wiki/index.php/List_of_mathematics_competitions', subject: 'mathematics' },
  { name: 'AoPS Contest Collections', base_url: 'https://artofproblemsolving.com/community/c13_contest_collections', subject: 'mathematics' },
  { name: 'APMO Problems', base_url: 'https://www.apmo-official.org/problems', subject: 'mathematics' },
  { name: 'IMO Collections', base_url: 'https://imomath.com/index.cgi?page=collectionI', subject: 'mathematics' },
  { name: 'Evan Chen Problem Collection', base_url: 'https://web.evanchen.cc/problems.html', subject: 'mathematics' },
  { name: 'Project Euler', base_url: 'https://projecteuler.net/', subject: 'mathematics' },
  { name: 'Brilliant Practice', base_url: 'https://brilliant.org/practice/', subject: 'mathematics' },
  { name: 'Putnam Archive', base_url: 'https://kskedlaya.org/putnam-archive/', subject: 'mathematics' },
  { name: 'IPhO Official', base_url: 'https://www.ipho-new.org/', subject: 'physics' },
  { name: 'IPhO Problems Mirror', base_url: 'https://ipho.olimpicos.net/', subject: 'physics' },
  { name: 'IPhO Unofficial', base_url: 'https://ipho-unofficial.org/', subject: 'physics' },
  { name: 'IPhO 2021 Problems', base_url: 'https://www.ipho2021.lt/en/ipho-problems/', subject: 'physics' },
  { name: 'IPhO 2026', base_url: 'https://ipho2026.com/', subject: 'physics' },
  { name: 'Jaan Kalda IPhO list', base_url: 'https://www.ioc.ee/~kalda/ipho/rec-list.html', subject: 'physics' },
  { name: 'Physoly Problems', base_url: 'https://physoly.tech/problems', subject: 'physics' },
  { name: 'MIT OCW', base_url: 'https://ocw.mit.edu', subject: 'physics' },
  { name: 'BPhO Round 1 Papers', base_url: 'https://www.bpho.org.uk/Papers/R1/', subject: 'physics' },
  { name: 'BPhO IPC Papers', base_url: 'https://www.bpho.org.uk/Papers/IPC/', subject: 'physics' },
  { name: 'AAPT Past Exams', base_url: 'https://www.aapt.org/Common2022/pastexams.cfm', subject: 'physics' },
  { name: 'US Physics Team Exams', base_url: 'https://aapt.org/physicsteam/PT-exams.cfm', subject: 'physics' },
  { name: 'IChO Official', base_url: 'https://www.icho-official.org', subject: 'chemistry' },
  { name: 'IChO Study Camp', base_url: 'https://www.ichosc.org', subject: 'chemistry' },
  { name: 'IChO Competition Problems', base_url: 'https://icho.sk/competition-problems/', subject: 'chemistry' },
  { name: 'IChO Preparatory Problems', base_url: 'https://icho.sk/preparatory-problems/', subject: 'chemistry' },
  { name: 'IChO 2025 Problems', base_url: 'https://www.icho2025.ae/problems', subject: 'chemistry' },
  { name: 'ACS Olympiad Prep', base_url: 'https://www.acs.org/education/olympiad/prepare-for-exams.html', subject: 'chemistry' },
  { name: 'RSC UKChO', base_url: 'https://edu.rsc.org/enrichment/uk-chemistry-olympiad', subject: 'chemistry' },
  { name: 'RSC UKChO Past Papers', base_url: 'https://edu.rsc.org/uk-chemistry-olympiad/chemistry-olympiad-past-papers/1641.article', subject: 'chemistry' },
  { name: 'Cambridge UKChO', base_url: 'https://outreach.ch.cam.ac.uk/uk-chemistry-olympiad', subject: 'chemistry' },
  { name: 'IOI', base_url: 'https://ioinformatics.org', subject: 'informatics' },
  { name: 'IOI Contest Archive', base_url: 'https://ioi.contest.codeforces.com', subject: 'informatics' },
  { name: 'Codeforces Problemset', base_url: 'https://codeforces.com/problemset', subject: 'informatics' },
  { name: 'USACO Guide', base_url: 'https://usaco.guide', subject: 'informatics' },
  { name: 'USACO Guide Problems', base_url: 'https://usaco.guide/problems/', subject: 'informatics' },
  { name: 'CSES Problemset', base_url: 'https://cses.fi/problemset/', subject: 'informatics' },
  { name: 'AtCoder', base_url: 'https://atcoder.jp', subject: 'informatics' },
  { name: 'OJ.UZ', base_url: 'https://oj.uz/problems', subject: 'informatics' },
  { name: 'Kattis', base_url: 'https://open.kattis.com/problems', subject: 'informatics' },
  { name: 'SPOJ Classical', base_url: 'https://www.spoj.com/problems/classical/', subject: 'informatics' },
  { name: 'Kaggle', base_url: 'https://kaggle.com', subject: 'mathematics' },
  { name: 'Hugging Face Datasets', base_url: 'https://huggingface.co/datasets', subject: 'mathematics' },
  { name: 'Papers With Code Datasets', base_url: 'https://paperswithcode.com/datasets', subject: 'mathematics' },
  { name: 'Zenodo', base_url: 'https://zenodo.org', subject: 'mathematics' },
  { name: 'Data.World', base_url: 'https://data.world', subject: 'mathematics' }
] as const;
