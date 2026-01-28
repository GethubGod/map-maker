import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { getQuiz, getMap, saveAttempt } from '../services/storageService';
import { calculatePinAccuracy, isAnswerCorrect } from '../services/quizService';
import { useQuizTimer } from '../hooks/useQuizTimer';
import QuizCanvas from '../components/quiz/QuizCanvas';
import QuizModeSelector from '../components/quiz/QuizModeSelector';
import QuizResults from '../components/quiz/QuizResults';
import type { Point } from '../models/Region';
import type { QuizAnswer, QuizAttempt } from '../models/QuizAttempt';

type QuizMode = 'countries' | 'capitals' | 'both';

export default function NorthAmericaQuizPage() {
  const navigate = useNavigate();
  const [quizMode, setQuizMode] = useState<QuizMode>('countries');
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);

  const {
    currentQuiz,
    currentMap,
    currentQuestionIndex,
    startQuiz,
    answerQuestion,
    nextQuestion,
    submitQuiz,
    resetQuiz,
  } = useQuizStore();

  const { elapsedSeconds, start: startTimer, reset: resetTimer, formatTime } = useQuizTimer();

  const [currentAnswer, setCurrentAnswer] = useState<QuizAnswer | null>(null);
  const showResults = quizAttempt !== null;
  const showFeedback = currentAnswer !== null;

  const loadQuizByMode = useCallback((mode: QuizMode) => {
    resetQuiz();
    resetTimer();

    let quizId = '';
    switch (mode) {
      case 'countries':
        quizId = 'north-america-countries';
        break;
      case 'capitals':
        quizId = 'north-america-capitals';
        break;
      case 'both':
        quizId = 'north-america-both';
        break;
    }

    const quiz = getQuiz(quizId);
    if (!quiz) {
      console.error('Quiz not found:', quizId);
      return;
    }

    const map = getMap(quiz.mapId);
    if (!map) {
      console.error('Map not found for quiz');
      return;
    }

    startQuiz(quiz, map);
    startTimer();
  }, [resetQuiz, resetTimer, startQuiz, startTimer]);

  // Load quiz based on selected mode
  useEffect(() => {
    loadQuizByMode(quizMode);
  }, [quizMode, loadQuizByMode]);

  const handleModeChange = (mode: QuizMode) => {
    if (currentQuiz && currentQuestionIndex > 0) {
      if (!confirm('Changing mode will restart the quiz. Continue?')) {
        return;
      }
    }
    setQuizAttempt(null);
    setCurrentAnswer(null);
    setQuizMode(mode);
  };

  // Handle pin placement
  const handlePinPlaced = (point: Point) => {
    if (!currentQuiz || !currentMap || currentAnswer) return;

    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const correctRegion = currentMap.regions.find(
      (r) => r.id === currentQuestion.correctRegionId
    );

    if (!correctRegion) return;

    const accuracy = calculatePinAccuracy(point, correctRegion);
    const isCorrect = isAnswerCorrect(
      { userPoint: point } as QuizAnswer,
      correctRegion
    );

    const answer: QuizAnswer = {
      questionId: currentQuestion.id,
      userPoint: point,
      isCorrect,
      distanceError: accuracy < 100 ? (100 - accuracy) * 10 : 0,
      timeSpent: elapsedSeconds * 1000,
    };

    setCurrentAnswer(answer);

    // Auto-advance after showing feedback
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    answerQuestion(currentAnswer);
    setCurrentAnswer(null);

    if (currentQuestionIndex === currentQuiz!.questions.length - 1) {
      // Last question - submit quiz
      const attempt = submitQuiz();
      saveAttempt(attempt);
      setQuizAttempt(attempt);
    } else {
      nextQuestion();
    }
  };

  const handleRetry = () => {
    setQuizAttempt(null);
    setCurrentAnswer(null);
    loadQuizByMode(quizMode);
  };

  if (!currentQuiz || !currentMap) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Loading quiz...</div>
      </div>
    );
  }

  if (showResults && quizAttempt) {
    return <QuizResults attempt={quizAttempt} quiz={currentQuiz} onRetry={handleRetry} />;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const correctRegion = currentMap.regions.find(
    (r) => r.id === currentQuestion.correctRegionId
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Mode Selector */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">North & Central America</h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
        </div>
        <QuizModeSelector currentMode={quizMode} onModeChange={handleModeChange} />
      </div>

      {/* Main Quiz Area */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600 mb-1">Question</div>
              <div className="text-2xl font-bold text-gray-900">
                {currentQuestionIndex + 1} / {currentQuiz.questions.length}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Score</div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((currentQuestionIndex / currentQuiz.questions.length) * 100)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Time</div>
              <div className="text-2xl font-mono font-bold text-gray-900">
                {formatTime(elapsedSeconds)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Question Prompt - Seterra Style */}
        <div className="bg-blue-600 text-white rounded-lg shadow-md mb-6 p-8 text-center">
          <h2 className="text-4xl font-bold">{currentQuestion.prompt}</h2>
          <p className="mt-2 text-blue-100">Click on the map to answer</p>
        </div>

        {/* Feedback Message */}
        {showFeedback && currentAnswer && correctRegion && (
          <div
            className={`rounded-lg shadow-md mb-6 p-6 text-center ${
              currentAnswer.isCorrect
                ? 'bg-green-100 border-2 border-green-400'
                : 'bg-red-100 border-2 border-red-400'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">
                {currentAnswer.isCorrect ? '✓' : '✗'}
              </span>
              <div>
                <div
                  className={`text-2xl font-bold ${
                    currentAnswer.isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}
                >
                  {currentAnswer.isCorrect ? 'Correct!' : 'Incorrect'}
                </div>
                {!currentAnswer.isCorrect && (
                  <div className="text-gray-700 mt-1">
                    Correct answer: {correctRegion.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Map Canvas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <QuizCanvas
            map={currentMap}
            onPinPlaced={handlePinPlaced}
            correctRegion={showFeedback ? correctRegion : undefined}
            showFeedback={showFeedback}
            disabled={!!currentAnswer}
          />
        </div>
      </div>
    </div>
  );
}
