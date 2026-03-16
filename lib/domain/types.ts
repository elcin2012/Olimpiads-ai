export type Role = 'STUDENT' | 'PARENT' | 'ADMIN';

export interface Subject {
  id: string;
  name: string;
  gradeRange: string;
  color: string;
}

export interface Olympiad {
  id: string;
  slug: string;
  title: string;
  description: string;
  subjectId: string;
  level: 'BEGINNER' | 'ADVANCED' | 'PRO';
  ageGroup: string;
  durationMinutes: number;
  questionsCount: number;
  rules: string[];
  topics: string[];
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  olympiadId: string;
  prompt: string;
  topic: string;
  difficulty: number;
  explanation: string;
  options: QuestionOption[];
  correctOptionId: string;
}

export interface AttemptAnswer {
  questionId: string;
  selectedOptionId: string;
}

export interface Attempt {
  id: string;
  olympiadId: string;
  studentId: string;
  startedAt: string;
  submittedAt?: string;
  answers: AttemptAnswer[];
  score?: number;
}

export interface AiGeneratedProblem {
  problem_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  topic: string;
  difficulty: number;
}
