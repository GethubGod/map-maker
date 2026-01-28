import { useNavigate } from 'react-router-dom';
import type { QuizAttempt } from '../../models/QuizAttempt';
import type { Quiz } from '../../models/Quiz';
import Button from '../common/Button';

interface QuizResultsProps {
  attempt: QuizAttempt;
  quiz: Quiz;
  onRetry?: () => void;
}

export default function QuizResults({ attempt, quiz, onRetry }: QuizResultsProps) {
  const navigate = useNavigate();
  const { score } = attempt;

  const isPassed = score.passed !== undefined ? score.passed : score.percentage >= 70;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`text-6xl mb-4 ${
              isPassed ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPassed ? '🎉' : '📚'}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isPassed ? 'Great Job!' : 'Keep Practicing!'}
          </h1>
          <p className="text-gray-600">{quiz.name}</p>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {score.percentage.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600">Score</div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {score.correct}/{score.total}
            </div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {formatTime(score.totalTime)}
            </div>
            <div className="text-sm text-gray-600">Time Taken</div>
          </div>

          {score.averageAccuracy !== undefined && (
            <div className="bg-orange-50 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {score.averageAccuracy.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">Avg Accuracy</div>
            </div>
          )}
        </div>

        {/* Pass/Fail Message */}
        {quiz.settings.passingScore && (
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Passing score: {quiz.settings.passingScore}%
            </p>
          </div>
        )}

        {/* Detailed Results */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Question Results
          </h2>
          <div className="space-y-2">
            {attempt.answers.map((answer, index) => {
              const question = quiz.questions[index];
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg flex items-center justify-between ${
                    answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {answer.isCorrect ? '✓' : '✗'}
                    </span>
                    <span className="text-gray-700">{question.prompt}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTime(answer.timeSpent)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {quiz.settings.allowRetry && onRetry && (
            <Button onClick={onRetry} variant="primary">
              Retry Quiz
            </Button>
          )}
          <Button onClick={() => navigate('/library')} variant="secondary">
            Back to Library
          </Button>
          <Button onClick={() => navigate('/')} variant="secondary">
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}

function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
