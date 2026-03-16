import { subjectGradeMap, subjectLabels } from '@/lib/constants';
import type { Subject } from '@/types/assistant';

export function validateSubjectGrade(subject: Subject, grade: number): { valid: boolean; message?: string } {
  const [min, max] = subjectGradeMap[subject];
  if (grade < min || grade > max) {
    return {
      valid: false,
      message: `Для предмета «${subjectLabels[subject]}» доступны только классы ${min}–${max}. Выберите корректный класс или другой предмет.`
    };
  }

  return { valid: true };
}
