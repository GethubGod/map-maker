import Button from '../common/Button';

interface QuizControlsProps {
  currentQuestion: number;
  totalQuestions: number;
  hasAnswered: boolean;
  onNext: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
}

export default function QuizControls({
  currentQuestion,
  totalQuestions,
  hasAnswered,
  onNext,
  onSubmit,
  isLastQuestion,
}: QuizControlsProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200">
      <div className="text-gray-600">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>

      <div className="flex gap-3">
        {isLastQuestion ? (
          <Button
            onClick={onSubmit}
            disabled={!hasAnswered}
            variant="success"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!hasAnswered}
            variant="primary"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
}
