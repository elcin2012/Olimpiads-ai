import type { Subject } from '@/types/assistant';

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

export const modeLabels = {
  SOLVE: 'Решить',
  CREATE: 'Создать задачу',
  CHECK: 'Проверить решение',
  HINT: 'Дать подсказки',
  TOUR: 'Мини-тур'
} as const;
