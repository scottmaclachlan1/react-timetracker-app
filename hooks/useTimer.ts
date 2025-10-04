import { useEffect, useRef, useState } from 'react';
import { Session, sessionStorage } from '../utils/sessionStorage';

export function useTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load sessions from storage on mount
  useEffect(() => {
    const loadSessions = async () => {
      const savedSessions = await sessionStorage.loadSessions();
      setSessions(savedSessions);
    };
    loadSessions();
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format date/time for session storage
  const formatDateTime = (date: Date): string => {
    return date.toLocaleString();
  };

  const start = () => {
    if (!isRunning && !isPaused) {
      // Starting fresh
      setElapsedTime(0);
      setIsRunning(true);
      setIsPaused(false);
    } else if (isPaused) {
      // Resuming from pause
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const pause = () => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
  };

  const stop = async () => {
    if (isRunning || isPaused) {
      const endTime = new Date();

      // Create new session using the elapsed time from the UI timer
      const newSession: Session = {
        id: Date.now().toString(),
        startTime: formatDateTime(
          new Date(endTime.getTime() - elapsedTime * 1000)
        ),
        endTime: formatDateTime(endTime),
        duration: formatTime(elapsedTime),
      };

      // Add to sessions in state
      const updatedSessions = [newSession, ...sessions];
      setSessions(updatedSessions);

      // Save to AsyncStorage
      await sessionStorage.addSession(newSession);

      // Reset timer
      setIsRunning(false);
      setIsPaused(false);
      setElapsedTime(0);
    }
  };

  // Update elapsed time every second
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  // Export sessions as JSON
  const exportSessionsAsJSON = async (): Promise<string> => {
    return await sessionStorage.getSessionsAsJSON();
  };

  // Clear all sessions
  const clearSessions = async (): Promise<void> => {
    await sessionStorage.clearSessions();
    setSessions([]);
  };

  return {
    isRunning,
    isPaused,
    elapsedTime,
    formattedTime: formatTime(elapsedTime),
    sessions,
    start,
    pause,
    stop,
    exportSessionsAsJSON,
    clearSessions,
  };
}
