import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import QuizPage from './pages/QuizPage';
import EditorPage from './pages/EditorPage';
import ResultsPage from './pages/ResultsPage';
import { initializeStorage } from './services/storageService';

function App() {
  useEffect(() => {
    // Initialize localStorage on app mount
    initializeStorage();
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
