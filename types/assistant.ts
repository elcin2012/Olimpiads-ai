export const MODES = [
  'SOLVE',
  'CREATE',
  'VERIFY',
  'HINT',
  'TOUR',
  'SIMILAR',
  'THEORY'
] as const;

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

export type AgentName =
  | 'solver'
  | 'verifier'
  | 'generator'
  | 'difficultyEstimator'
  | 'similarityAgent'
  | 'hintGenerator';

export type AssistantResult = {
  idea?: string;
  steps?: string[];
  answer?: string;
  difficulty?: number;
  hints?: string[];
  theory?: string;
  analysis?: {
    correct: string[];
    mistakes: string[];
    fixes: string[];
  };
  generatedProblem?: {
    statement: string;
    solution?: string;
    answer?: string;
  };
  problems?: Array<{
    statement: string;
    solution?: string;
    answer?: string;
    difficulty?: number;
  }>;
  similarProblems?: Array<{
    statement: string;
    shortIdea?: string;
    difficulty?: number;
  }>;
  uncertainty?: string;
  pipeline?: Array<{ agent: AgentName; status: 'ok' | 'fallback'; note: string }>;
};

export type AssistantResponse = {
  subject: Subject;
  grade: number;
  mode: AssistantMode;
  topic: string;
  result: AssistantResult;
  retrievedContextCount: number;
};

export type RetrievedProblem = {
  id: number;
  subject: Subject;
  topic: string | null;
  difficulty: number | null;
  grade: number | null;
  problem_text: string;
  solution_text: string | null;
  answer_text: string | null;
  tags: string[] | null;
};
