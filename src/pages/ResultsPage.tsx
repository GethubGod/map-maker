import { useNavigate } from 'react-router-dom';

export default function ResultsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Results</h1>
      <p className="text-gray-600 mb-8">Results will display here.</p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/quiz')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry Quiz
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
