import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import QuizPage from './pages/QuizPage';
import EditorPage from './pages/EditorPage';
import ResultsPage from './pages/ResultsPage';
import { initializeStorage, saveMap, saveQuiz, getAllMaps } from './services/storageService';
import { sampleMaps, sampleQuizzes } from './constants/sampleMaps';

function App() {
  useEffect(() => {
    // Initialize localStorage on app mount
    initializeStorage();

    // Load sample data if no maps exist
    const existingMaps = getAllMaps();
    if (Object.keys(existingMaps).length === 0) {
      sampleMaps.forEach((map) => saveMap(map));
      sampleQuizzes.forEach((quiz) => saveQuiz(quiz));
      console.log('Loaded sample maps and quizzes');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/editor/:mapId" element={<EditorPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
