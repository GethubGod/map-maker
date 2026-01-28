import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Map Maker Quiz</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Learn geography by pinning locations on interactive maps.
        Create custom maps and quizzes to test yourself.
      </p>

      <div className="flex gap-4">
        <Link
          to="/library"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Quizzes
        </Link>
        <Link
          to="/editor"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Create Map
        </Link>
      </div>
    </div>
  );
}
