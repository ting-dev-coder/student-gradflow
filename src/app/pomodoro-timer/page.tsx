'use client';

import { Button } from '@mantine/core';
import { UseCountdownTimer } from './hooks/use-countdown-timer';
export default function PomodoroTimer() {
  const {
    time,
    handleReset,
    isRunning,
    handleStartPause,
    formatTime,
    isOngoing,
  } = UseCountdownTimer();
  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <Button onClick={handleStartPause}>
        {isRunning ? 'Pause' : isOngoing ? 'Resume' : 'Start'}
      </Button>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
}
