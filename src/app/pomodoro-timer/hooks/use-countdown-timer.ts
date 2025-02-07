'use client';

import { useEffect, useState } from 'react';

const DEFAULT_SECONDS = 25 * 60; // 25 minutes in seconds
export function UseCountdownTimer() {
  const [time, setTime] = useState(DEFAULT_SECONDS);

  const isOngoing = time !== DEFAULT_SECONDS;

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRunning, time]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`;
  };
  return {
    handleStartPause,
    handleReset,
    formatTime,
    time,
    isRunning,
    isOngoing,
  };
}
