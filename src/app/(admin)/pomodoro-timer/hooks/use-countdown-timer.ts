'use client';

import { useEffect, useRef, useState } from 'react';

export function UseCountdownTimer(initialSeconds = 25 * 60) {
  const [time, setTime] = useState(initialSeconds);
  const [startTime, setStartTime] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const timerUpCallback = useRef<(() => void) | null>(null);

  // isOngoing 代表計時是否已開始過
  const isOngoing = time !== startTime;

  // **監聽外部傳入的 initialSeconds**
  useEffect(() => {
    if (!isRunning) {
      setTime(initialSeconds);
      setStartTime(initialSeconds);
    }
  }, [initialSeconds, isRunning]);

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
    if (time === 0) {
      setIsRunning(false);
      if (timerUpCallback.current) {
        timerUpCallback.current(); // 呼叫倒數結束時的回調函數
      }
    }
  }, [time]);

  const handleStartPause = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    } else {
      setIsRunning(true);
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

  return {
    handleStartPause,
    handleReset,
    handleSetTime,
    formatTime,
    onTimerUp,
    time,
    isRunning: !!timerId.current, // 用 timerId 判斷是否真的在倒數
    isOngoing,
  };
}
