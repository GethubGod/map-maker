export type QuestionType = 'locate' | 'identify';
export type ScoringMode = 'accuracy' | 'speed' | 'combined';

export interface QuizQuestion {
  id: string;
  type: QuestionType; // Pin location vs identify clicked region
  prompt: string; // e.g., "Find France"
  correctRegionId: string; // Reference to Region.id
  hints?: string[];
}

export interface QuizSettings {
  timeLimit?: number; // Seconds, undefined = no limit
  allowRetry: boolean;
  showCorrectAnswers: boolean;
  scoringMode: ScoringMode;
  passingScore?: number; // Percentage
}

export interface Quiz {
  id: string;
  mapId: string; // Reference to CustomMap
  name: string;
  description?: string;
  questions: QuizQuestion[];
  settings: QuizSettings;
  createdAt: number;
  updatedAt: number;
}
