import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { getQuiz, getMap, saveAttempt } from '../services/storageService';
import { calculatePinAccuracy, isAnswerCorrect } from '../services/quizService';
import { useQuizTimer } from '../hooks/useQuizTimer';
import QuizCanvas from '../components/quiz/QuizCanvas';
import QuizControls from '../components/quiz/QuizControls';
import QuizFeedback from '../components/quiz/QuizFeedback';
import QuizResults from '../components/quiz/QuizResults';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { Point } from '../models/Region';
import type { QuizAnswer, QuizAttempt } from '../models/QuizAttempt';

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const {
    currentQuiz,
    currentMap,
    currentQuestionIndex,
    isQuizComplete,
    startQuiz,
    answerQuestion,
    nextQuestion,
    submitQuiz,
    resetQuiz,
  } = useQuizStore();

  const { elapsedSeconds, start: startTimer, formatTime } = useQuizTimer();

  const [currentAnswer, setCurrentAnswer] = useState<QuizAnswer | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);

  // Load quiz on mount
  useEffect(() => {
    if (!quizId) {
      navigate('/library');
      return;
    }

    const quiz = getQuiz(quizId);
    if (!quiz) {
      alert('Quiz not found');
      navigate('/library');
      return;
    }

    const map = getMap(quiz.mapId);
    if (!map) {
      alert('Map not found for this quiz');
      navigate('/library');
      return;
    }

    startQuiz(quiz, map);
    startTimer();
  }, [quizId, navigate, startQuiz, startTimer]);

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
    setShowFeedback(true);
  };

  // Handle next question
  const handleNext = () => {
    if (!currentAnswer) return;

    answerQuestion(currentAnswer);
    setCurrentAnswer(null);
    setShowFeedback(false);
    nextQuestion();
  };

  // Handle submit quiz
  const handleSubmit = () => {
    if (!currentAnswer) return;

    answerQuestion(currentAnswer);
    const attempt = submitQuiz();
    saveAttempt(attempt);
    setQuizAttempt(attempt);
  };

  // Handle retry
  const handleRetry = () => {
    setQuizAttempt(null);
    resetQuiz();
    if (quizId) {
      const quiz = getQuiz(quizId);
      const map = quiz ? getMap(quiz.mapId) : null;
      if (quiz && map) {
        startQuiz(quiz, map);
        startTimer();
      }
    }
  };

  if (!currentQuiz || !currentMap) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Show results if quiz is complete
  if (isQuizComplete && quizAttempt) {
    return <QuizResults attempt={quizAttempt} quiz={currentQuiz} onRetry={handleRetry} />;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const correctRegion = currentMap.regions.find(
    (r) => r.id === currentQuestion.correctRegionId
  );
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{currentQuiz.name}</h1>
            <div className="text-lg font-mono text-gray-700">
              {formatTime(elapsedSeconds)}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">
                {currentQuestionIndex + 1} / {currentQuiz.questions.length}
              </span>
            </div>
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

        {/* Question Prompt */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {currentQuestion.prompt}
          </h2>
          <p className="text-gray-600 text-sm">Click on the map to place your answer</p>
        </div>

        {/* Feedback */}
        {showFeedback && currentAnswer && correctRegion && (
          <QuizFeedback
            isCorrect={currentAnswer.isCorrect}
            accuracy={
              currentAnswer.userPoint
                ? calculatePinAccuracy(currentAnswer.userPoint, correctRegion)
                : undefined
            }
            correctAnswer={!currentAnswer.isCorrect ? correctRegion.name : undefined}
          />
        )}

        {/* Canvas */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-6">
          <QuizCanvas
            map={currentMap}
            onPinPlaced={handlePinPlaced}
            correctRegion={showFeedback ? correctRegion : undefined}
            showFeedback={showFeedback}
            disabled={!!currentAnswer}
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md">
          <QuizControls
            currentQuestion={currentQuestionIndex}
            totalQuestions={currentQuiz.questions.length}
            hasAnswered={!!currentAnswer}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isLastQuestion={isLastQuestion}
          />
        </div>
      </div>
    </div>
  );
}
