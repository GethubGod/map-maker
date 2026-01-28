import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibraryStore } from '../../store/libraryStore';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

export default function MapLibrary() {
  const navigate = useNavigate();
  const { maps, quizzes, isLoading, searchQuery, setSearchQuery, loadLibrary } =
    useLibraryStore();

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  const quizArray = Object.values(quizzes);

  // Filter quizzes by search query
  const filteredQuizzes = searchQuery
    ? quizArray.filter((quiz) =>
        quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : quizArray;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Library</h1>
        <p className="text-gray-600 mb-6">
          Choose a quiz to test your geography knowledge
        </p>

        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={() => navigate('/editor')} variant="success">
            Create New Map
          </Button>
        </div>
      </div>

      {/* Quiz Grid */}
      {filteredQuizzes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {searchQuery
              ? 'No quizzes found matching your search'
              : 'No quizzes available yet'}
          </p>
          <Button onClick={() => navigate('/editor')} variant="primary">
            Create Your First Map
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => {
            const map = maps[quiz.mapId];
            if (!map) return null;

            return (
              <div
                key={quiz.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Map Preview */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <img
                    src={map.imageData}
                    alt={map.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quiz Info */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {quiz.name}
                  </h3>
                  {quiz.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {quiz.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{quiz.questions.length} questions</span>
                    {quiz.settings.timeLimit && (
                      <span>{quiz.settings.timeLimit}s time limit</span>
                    )}
                  </div>

                  <Button
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    variant="primary"
                    className="w-full"
                  >
                    Start Quiz
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
