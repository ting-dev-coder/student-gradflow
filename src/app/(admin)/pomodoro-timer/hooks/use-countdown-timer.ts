'use client';

import { useEffect, useRef, useState } from 'react';

export function UseCountdownTimer(initialSeconds = 25 * 60) {
  const [time, setTime] = useState(initialSeconds);
  const [startTime, setStartTime] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false); // 取代 hasStarted
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const timerUpCallback = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (!isRunning) {
      setTime(initialSeconds);
      setStartTime(initialSeconds);
    }
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning || time <= 0) {
      return;
    }

    timerId.current = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [isRunning, time]);

  useEffect(() => {
    if (time <= 0) {
      setIsRunning(false);
      if (timerUpCallback.current) {
        timerUpCallback.current();
      }
    }
  }, [time]);

  const handleStartPause = () => {
    if (isRunning) {
      setIsRunning(false); // 暫停計時
    } else {
      setIsRunning(true); // 開始計時
      setIsOngoing(true); // 曾經開始過倒數，確保不會回到 false
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
    setTime(startTime);
  };

  const handleSetTime = (seconds: number) => {
    setTime(seconds);
    setStartTime(seconds);
    setIsRunning(false);
    setIsOngoing(false);
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      mins: String(minutes).padStart(2, '0'),
      secs: String(secs).padStart(2, '0'),
    };
  };

  const onTimerUp = (callback: () => void) => {
    timerUpCallback.current = callback;
  };

  function handleStop() {
    handleReset();
    setIsOngoing(false);
  }

  return {
    handleStop,
    handleStartPause,
    handleReset,
    handleSetTime,
    formatTime,
    onTimerUp,
    time,
    isRunning, // true: 計時中, false: 暫停
    isOngoing, // true: 曾經開始過倒數，不因暫停變 false
  };
}
