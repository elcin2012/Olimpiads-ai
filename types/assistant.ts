export const MODES = ['SOLVE', 'CREATE', 'CHECK', 'HINT', 'TOUR'] as const;
export type AssistantMode = (typeof MODES)[number];

export const SUBJECTS = ['mathematics', 'physics', 'chemistry', 'informatics'] as const;
export type Subject = (typeof SUBJECTS)[number];

export type AssistantPayload = {
  mode: AssistantMode;
  subject: Subject;
  grade: number;
  topic?: string;
  problemText?: string;
  studentSolution?: string;
};

export type AssistantResult = {
  idea?: string;
  steps?: string[];
  answer?: string;
  difficulty?: number;
  hints?: string[];
  analysis?: {
    correct: string[];
    mistakes: string[];
    fixes: string[];
  };
  problems?: Array<{
    statement: string;
    answer?: string;
    difficulty?: number;
  }>;
};

export type AssistantResponse = {
  subject: Subject;
  grade: number;
  mode: AssistantMode;
  topic: string;
  result: AssistantResult;
};
