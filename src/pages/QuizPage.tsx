import { useNavigate } from 'react-router-dom';

export default function QuizPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Page</h1>
      <p className="text-gray-600 mb-8">Quiz canvas will go here.</p>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
}
