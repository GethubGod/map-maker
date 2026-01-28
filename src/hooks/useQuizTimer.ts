import { useState, useEffect, useCallback } from 'react';

interface UseQuizTimerReturn {
  elapsedSeconds: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formatTime: (seconds: number) => string;
}

export function useQuizTimer(): UseQuizTimerReturn {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (!isRunning || startTime === null) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      setElapsedSeconds(elapsed);
    }, 100); // Update every 100ms for smooth display

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const start = useCallback(() => {
    setStartTime(Date.now() - elapsedSeconds * 1000);
    setIsRunning(true);
  }, [elapsedSeconds]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setElapsedSeconds(0);
    setStartTime(null);
    setIsRunning(false);
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    elapsedSeconds,
    isRunning,
    start,
    pause,
    reset,
    formatTime,
  };
}
