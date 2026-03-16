import { subjectGradeMap } from '@/lib/constants';
import type { Subject } from '@/types/assistant';

export function validateSubjectGrade(subject: Subject, grade: number): { valid: boolean; message?: string } {
  const [min, max] = subjectGradeMap[subject];
  if (grade < min || grade > max) {
    return {
      valid: false,
      message: `Для предмета ${subject} доступны только классы ${min}–${max}. Выберите другой класс или предмет.`
    };
  }

  return { valid: true };
}
