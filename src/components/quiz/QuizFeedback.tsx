interface QuizFeedbackProps {
  isCorrect: boolean;
  accuracy?: number;
  correctAnswer?: string;
}

export default function QuizFeedback({
  isCorrect,
  accuracy,
  correctAnswer,
}: QuizFeedbackProps) {
  return (
    <div
      className={`p-4 rounded-lg mb-4 ${
        isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {isCorrect ? (
          <>
            <span className="text-2xl">✓</span>
            <span className="font-semibold text-green-800">Correct!</span>
          </>
        ) : (
          <>
            <span className="text-2xl">✗</span>
            <span className="font-semibold text-red-800">Incorrect</span>
          </>
        )}
      </div>

      {accuracy !== undefined && (
        <div className="text-sm text-gray-700 mb-1">
          Accuracy: {accuracy.toFixed(0)}%
        </div>
      )}

      {!isCorrect && correctAnswer && (
        <div className="text-sm text-gray-700">
          The correct answer was: <span className="font-medium">{correctAnswer}</span>
        </div>
      )}
    </div>
  );
}
