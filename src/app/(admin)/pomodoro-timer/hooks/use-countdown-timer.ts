'use client';

import { useEffect, useState } from 'react';

export function UseCountdownTimer(initialSeconds = 25 * 60) {
  const [time, setTime] = useState(initialSeconds);
  const [startTime, setStartTime] = useState(initialSeconds); // 記錄初始秒數
  const [isRunning, setIsRunning] = useState(false);

  // isOngoing 代表計時是否已開始過
  const isOngoing = time !== startTime;

  useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
    }
    if (isRunning && time > 0) {
      const timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRunning, time]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(startTime);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    console.log();
    return {
      mins: String(minutes).padStart(2, '0'),
      secs: String(secs).padStart(2, '0'),
    };
  };

  function handleSetTime(seconds: number) {
    setTime(seconds);
    setStartTime(seconds);
  }

  return {
    handleStartPause,
    handleReset,
    handleSetTime,
    formatTime,
    time,
    isRunning,
    isOngoing,
  };
}
