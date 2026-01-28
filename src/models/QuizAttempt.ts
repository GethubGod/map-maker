import type { Point } from './Region';

export interface QuizAnswer {
  questionId: string;
  userPoint?: Point; // Where user clicked
  selectedRegionId?: string; // For identify questions
  isCorrect: boolean;
  distanceError?: number; // Pixels from correct answer
  timeSpent: number; // Milliseconds
}

export interface QuizScore {
  correct: number;
  total: number;
  percentage: number;
  averageAccuracy?: number; // For pin-based questions
  totalTime: number;
  passed?: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  startedAt: number;
  completedAt?: number;
  answers: QuizAnswer[];
  score: QuizScore;
}
