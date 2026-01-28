import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
          Geography Quiz
        </h1>
        <p className="text-xl text-gray-600 mb-12 text-center">
          Test your knowledge of world geography with interactive maps
        </p>

        {/* Featured Quiz */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">North & Central America</h2>
              <p className="text-blue-100 mb-4">
                Learn all countries and capitals • 15 countries • Multiple modes
              </p>
              <Link
                to="/north-america"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg shadow-md"
              >
                Start Quiz →
              </Link>
            </div>
            <div className="text-6xl opacity-20">🗺️</div>
          </div>
        </div>

        {/* Other Options */}
        <div className="grid grid-cols-2 gap-6">
          <Link
            to="/library"
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Browse All Quizzes</h3>
            <p className="text-sm text-gray-600">Explore all available geography quizzes</p>
          </Link>

          <Link
            to="/editor"
            className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-2">✏️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Create Custom Map</h3>
            <p className="text-sm text-gray-600">Design your own geography quiz</p>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
            Features
          </h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-medium text-gray-700">Accurate Scoring</div>
            </div>
            <div>
              <div className="text-2xl mb-2">⏱️</div>
              <div className="text-sm font-medium text-gray-700">Timed Challenges</div>
            </div>
            <div>
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium text-gray-700">Detailed Results</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
