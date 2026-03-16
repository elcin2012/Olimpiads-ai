import { Olympiad, Question, Subject } from '@/lib/domain/types';

export const subjects: Subject[] = [
  { id: 'math', name: 'Математика', gradeRange: '5-11 класс', color: 'bg-blue-100 text-blue-700' },
  { id: 'physics', name: 'Физика', gradeRange: '7-11 класс', color: 'bg-violet-100 text-violet-700' },
  { id: 'informatics', name: 'Информатика', gradeRange: '6-11 класс', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'chemistry', name: 'Химия', gradeRange: '8-11 класс', color: 'bg-amber-100 text-amber-700' }
];

export const olympiads: Olympiad[] = [
  {
    id: 'olymp-1',
    slug: 'algebra-sprint',
    title: 'Algebra Sprint 2026',
    description: 'Быстрая олимпиада по алгебре на логику, уравнения и функции.',
    subjectId: 'math',
    level: 'ADVANCED',
    ageGroup: '8-9 класс',
    durationMinutes: 45,
    questionsCount: 10,
    rules: ['1 попытка в день', 'Автопроверка после завершения', 'Результат сохраняется в профиль'],
    topics: ['Уравнения', 'Функции', 'Неравенства']
  },
  {
    id: 'olymp-2',
    slug: 'physics-mechanics-cup',
    title: 'Mechanics Cup',
    description: 'Олимпиада по механике: кинематика, силы и законы Ньютона.',
    subjectId: 'physics',
    level: 'PRO',
    ageGroup: '9-11 класс',
    durationMinutes: 60,
    questionsCount: 12,
    rules: ['Секундомер не останавливается', 'Разрешены черновики', 'Подробный разбор ошибок'],
    topics: ['Кинематика', 'Динамика', 'Импульс']
  },
  {
    id: 'olymp-3',
    slug: 'algorithms-qualifier',
    title: 'Algorithms Qualifier',
    description: 'Подготовительный этап по алгоритмам и структурам данных.',
    subjectId: 'informatics',
    level: 'BEGINNER',
    ageGroup: '7-10 класс',
    durationMinutes: 40,
    questionsCount: 8,
    rules: ['Можно менять ответы до отправки', 'AI-рекомендации доступны сразу'],
    topics: ['Массивы', 'Графы', 'Сложность алгоритмов']
  }
];

export const questions: Question[] = [
  {
    id: 'q-1',
    olympiadId: 'olymp-1',
    prompt: 'Решите уравнение: 2x^2 - 5x - 3 = 0',
    topic: 'Уравнения',
    difficulty: 2,
    explanation: 'Дискриминант D = 49. Корни: x = 3 и x = -0.5.',
    options: [
      { id: 'a', text: 'x = 3 и x = -0.5' },
      { id: 'b', text: 'x = 1 и x = -3' },
      { id: 'c', text: 'x = 3 и x = 0.5' },
      { id: 'd', text: 'Нет корней' }
    ],
    correctOptionId: 'a'
  },
  {
    id: 'q-2',
    olympiadId: 'olymp-1',
    prompt: 'Найдите область определения функции y = 1 / (x - 4).',
    topic: 'Функции',
    difficulty: 1,
    explanation: 'Знаменатель не равен нулю, значит x ≠ 4.',
    options: [
      { id: 'a', text: 'x > 4' },
      { id: 'b', text: 'x ≠ 4' },
      { id: 'c', text: 'x < 4' },
      { id: 'd', text: 'x ∈ R' }
    ],
    correctOptionId: 'b'
  },
  {
    id: 'q-3',
    olympiadId: 'olymp-2',
    prompt: 'Тело движется с ускорением 2 м/с². Как изменится скорость за 5 секунд?',
    topic: 'Кинематика',
    difficulty: 1,
    explanation: 'Δv = a·t = 2·5 = 10 м/с.',
    options: [
      { id: 'a', text: '5 м/с' },
      { id: 'b', text: '10 м/с' },
      { id: 'c', text: '2.5 м/с' },
      { id: 'd', text: '20 м/с' }
    ],
    correctOptionId: 'b'
  }
];

export const studentPerformance = [
  { week: 'W1', score: 61 },
  { week: 'W2', score: 66 },
  { week: 'W3', score: 73 },
  { week: 'W4', score: 78 },
  { week: 'W5', score: 84 }
];
