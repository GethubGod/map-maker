import { create } from 'zustand';
import type { Quiz } from '../models/Quiz';
import type { CustomMap } from '../models/Map';
import type { QuizAnswer, QuizAttempt, QuizScore } from '../models/QuizAttempt';

interface QuizState {
  // Current quiz data
  currentQuiz: Quiz | null;
  currentMap: CustomMap | null;
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  startTime: number | null;
  questionStartTime: number | null;
  isQuizActive: boolean;
  isQuizComplete: boolean;

  // Timer
  elapsedTime: number; // seconds

  // Actions
  startQuiz: (quiz: Quiz, map: CustomMap) => void;
  answerQuestion: (answer: QuizAnswer) => void;
  nextQuestion: () => void;
  submitQuiz: () => QuizAttempt;
  resetQuiz: () => void;
  updateElapsedTime: (seconds: number) => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuiz: null,
  currentMap: null,
  currentQuestionIndex: 0,
  answers: [],
  startTime: null,
  questionStartTime: null,
  isQuizActive: false,
  isQuizComplete: false,
  elapsedTime: 0,

  startQuiz: (quiz, map) => {
    const now = Date.now();
    set({
      currentQuiz: quiz,
      currentMap: map,
      currentQuestionIndex: 0,
      answers: [],
      startTime: now,
      questionStartTime: now,
      isQuizActive: true,
      isQuizComplete: false,
      elapsedTime: 0,
    });
  },

  answerQuestion: (answer) => {
    set((state) => ({
      answers: [...state.answers, answer],
    }));
  },

  nextQuestion: () => {
    const { currentQuiz, currentQuestionIndex } = get();
    if (!currentQuiz) return;

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < currentQuiz.questions.length) {
      set({
        currentQuestionIndex: nextIndex,
        questionStartTime: Date.now(),
      });
    }
  },

  submitQuiz: () => {
    const { currentQuiz, answers, startTime } = get();
    if (!currentQuiz || !startTime) {
      throw new Error('No active quiz to submit');
    }

    const completedAt = Date.now();
    const totalTime = completedAt - startTime;

    // Calculate score
    const correct = answers.filter(a => a.isCorrect).length;
    const total = answers.length;
    const percentage = total > 0 ? (correct / total) * 100 : 0;

    // Calculate average accuracy for pin-based questions
    const pinAnswers = answers.filter(a => a.distanceError !== undefined);
    const averageAccuracy = pinAnswers.length > 0
      ? pinAnswers.reduce((sum, a) => sum + (a.isCorrect ? 100 : 0), 0) / pinAnswers.length
      : undefined;

    const score: QuizScore = {
      correct,
      total,
      percentage,
      averageAccuracy,
      totalTime,
      passed: currentQuiz.settings.passingScore
        ? percentage >= currentQuiz.settings.passingScore
        : undefined,
    };

    const attempt: QuizAttempt = {
      id: crypto.randomUUID(),
      quizId: currentQuiz.id,
      startedAt: startTime,
      completedAt,
      answers,
      score,
    };

    set({
      isQuizActive: false,
      isQuizComplete: true,
    });

    return attempt;
  },

  resetQuiz: () => {
    set({
      currentQuiz: null,
      currentMap: null,
      currentQuestionIndex: 0,
      answers: [],
      startTime: null,
      questionStartTime: null,
      isQuizActive: false,
      isQuizComplete: false,
      elapsedTime: 0,
    });
  },

  updateElapsedTime: (seconds) => {
    set({ elapsedTime: seconds });
  },
}));
