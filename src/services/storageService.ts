import type { CustomMap } from '../models/Map';
import type { Quiz } from '../models/Quiz';
import type { QuizAttempt } from '../models/QuizAttempt';

// Storage keys
export const STORAGE_KEYS = {
  MAPS: 'geoquiz_maps',
  QUIZZES: 'geoquiz_quizzes',
  ATTEMPTS: 'geoquiz_attempts',
  SETTINGS: 'geoquiz_settings',
  VERSION: 'geoquiz_version',
} as const;

const CURRENT_VERSION = '1.0.0';

// Settings interface
export interface AppSettings {
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  defaultQuizSettings: {
    timeLimit?: number;
    allowRetry: boolean;
    showCorrectAnswers: boolean;
    scoringMode: 'accuracy' | 'speed' | 'combined';
  };
}

// Initialize storage with version
export function initializeStorage(): void {
  const version = localStorage.getItem(STORAGE_KEYS.VERSION);

  if (!version) {
    // First time initialization
    localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
    localStorage.setItem(STORAGE_KEYS.MAPS, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify({}));
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify({}));

    const defaultSettings: AppSettings = {
      theme: 'light',
      soundEnabled: false,
      defaultQuizSettings: {
        allowRetry: true,
        showCorrectAnswers: true,
        scoringMode: 'accuracy',
      },
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  } else if (version !== CURRENT_VERSION) {
    // Handle migrations in the future
    migrateStorage(version, CURRENT_VERSION);
  }
}

function migrateStorage(fromVersion: string, toVersion: string): void {
  console.log(`Migrating storage from ${fromVersion} to ${toVersion}`);
  // Future migration logic here
  localStorage.setItem(STORAGE_KEYS.VERSION, toVersion);
}

// Generic storage helpers
function getStorageData<T>(key: string): Record<string, T> {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error(`Error reading from storage key ${key}:`, error);
    return {};
  }
}

function setStorageData<T>(key: string, data: Record<string, T>): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to storage key ${key}:`, error);
    throw new Error('Storage quota exceeded or storage unavailable');
  }
}

// Map CRUD operations
export function getAllMaps(): Record<string, CustomMap> {
  return getStorageData<CustomMap>(STORAGE_KEYS.MAPS);
}

export function getMap(id: string): CustomMap | undefined {
  const maps = getAllMaps();
  return maps[id];
}

export function saveMap(map: CustomMap): void {
  const maps = getAllMaps();
  maps[map.id] = map;
  setStorageData(STORAGE_KEYS.MAPS, maps);
}

export function deleteMap(id: string): void {
  const maps = getAllMaps();
  delete maps[id];
  setStorageData(STORAGE_KEYS.MAPS, maps);

  // Also delete associated quizzes
  const quizzes = getAllQuizzes();
  Object.keys(quizzes).forEach(quizId => {
    if (quizzes[quizId].mapId === id) {
      delete quizzes[quizId];
    }
  });
  setStorageData(STORAGE_KEYS.QUIZZES, quizzes);
}

// Quiz CRUD operations
export function getAllQuizzes(): Record<string, Quiz> {
  return getStorageData<Quiz>(STORAGE_KEYS.QUIZZES);
}

export function getQuiz(id: string): Quiz | undefined {
  const quizzes = getAllQuizzes();
  return quizzes[id];
}

export function getQuizzesByMapId(mapId: string): Quiz[] {
  const quizzes = getAllQuizzes();
  return Object.values(quizzes).filter(quiz => quiz.mapId === mapId);
}

export function saveQuiz(quiz: Quiz): void {
  const quizzes = getAllQuizzes();
  quizzes[quiz.id] = quiz;
  setStorageData(STORAGE_KEYS.QUIZZES, quizzes);
}

export function deleteQuiz(id: string): void {
  const quizzes = getAllQuizzes();
  delete quizzes[id];
  setStorageData(STORAGE_KEYS.QUIZZES, quizzes);

  // Optionally delete associated attempts
  const attempts = getAllAttempts();
  Object.keys(attempts).forEach(attemptId => {
    if (attempts[attemptId].quizId === id) {
      delete attempts[attemptId];
    }
  });
  setStorageData(STORAGE_KEYS.ATTEMPTS, attempts);
}

// QuizAttempt CRUD operations
export function getAllAttempts(): Record<string, QuizAttempt> {
  return getStorageData<QuizAttempt>(STORAGE_KEYS.ATTEMPTS);
}

export function getAttempt(id: string): QuizAttempt | undefined {
  const attempts = getAllAttempts();
  return attempts[id];
}

export function getAttemptsByQuizId(quizId: string): QuizAttempt[] {
  const attempts = getAllAttempts();
  return Object.values(attempts)
    .filter(attempt => attempt.quizId === quizId)
    .sort((a, b) => b.startedAt - a.startedAt); // Most recent first
}

export function saveAttempt(attempt: QuizAttempt): void {
  const attempts = getAllAttempts();
  attempts[attempt.id] = attempt;
  setStorageData(STORAGE_KEYS.ATTEMPTS, attempts);
}

export function deleteAttempt(id: string): void {
  const attempts = getAllAttempts();
  delete attempts[id];
  setStorageData(STORAGE_KEYS.ATTEMPTS, attempts);
}

export function cleanupOldAttempts(keepCount: number = 10): void {
  const attempts = getAllAttempts();
  const attemptsList = Object.values(attempts).sort((a, b) => b.startedAt - a.startedAt);

  // Keep only the most recent keepCount attempts
  if (attemptsList.length > keepCount) {
    const toKeep = attemptsList.slice(0, keepCount);
    const newAttempts: Record<string, QuizAttempt> = {};
    toKeep.forEach(attempt => {
      newAttempts[attempt.id] = attempt;
    });
    setStorageData(STORAGE_KEYS.ATTEMPTS, newAttempts);
  }
}

// Settings operations
export function getSettings(): AppSettings {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      theme: 'light',
      soundEnabled: false,
      defaultQuizSettings: {
        allowRetry: true,
        showCorrectAnswers: true,
        scoringMode: 'accuracy',
      },
    };
  } catch (error) {
    console.error('Error reading settings:', error);
    return {
      theme: 'light',
      soundEnabled: false,
      defaultQuizSettings: {
        allowRetry: true,
        showCorrectAnswers: true,
        scoringMode: 'accuracy',
      },
    };
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

// Storage usage monitoring
export interface StorageUsage {
  used: number; // bytes
  available: number; // bytes
  percentage: number; // 0-100
  formattedUsed: string; // e.g., "1.5 MB"
  formattedAvailable: string; // e.g., "3.5 MB"
}

export function getStorageUsage(): StorageUsage {
  const TOTAL_LIMIT = 5 * 1024 * 1024; // 5MB in bytes
  let used = 0;

  for (const key in localStorage) {
    if (key.startsWith('geoquiz_')) {
      used += localStorage[key].length * 2; // UTF-16 = 2 bytes per char
    }
  }

  const available = TOTAL_LIMIT - used;
  const percentage = (used / TOTAL_LIMIT) * 100;

  return {
    used,
    available,
    percentage,
    formattedUsed: formatBytes(used),
    formattedAvailable: formatBytes(available),
  };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

// Export/Import functionality
export function exportAllData(): string {
  const data = {
    version: CURRENT_VERSION,
    maps: getAllMaps(),
    quizzes: getAllQuizzes(),
    attempts: getAllAttempts(),
    settings: getSettings(),
    exportedAt: Date.now(),
  };
  return JSON.stringify(data, null, 2);
}

export function importData(jsonData: string): void {
  try {
    const data = JSON.parse(jsonData);

    if (data.maps) setStorageData(STORAGE_KEYS.MAPS, data.maps);
    if (data.quizzes) setStorageData(STORAGE_KEYS.QUIZZES, data.quizzes);
    if (data.attempts) setStorageData(STORAGE_KEYS.ATTEMPTS, data.attempts);
    if (data.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));

    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
    throw new Error('Invalid import data format');
  }
}

// Clear all data
export function clearAllData(): void {
  if (confirm('Are you sure you want to delete all maps, quizzes, and attempts? This cannot be undone.')) {
    localStorage.removeItem(STORAGE_KEYS.MAPS);
    localStorage.removeItem(STORAGE_KEYS.QUIZZES);
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    initializeStorage();
  }
}
