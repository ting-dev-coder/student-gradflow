import { useState, useEffect } from 'react';

export default function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
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

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <button onClick={handleStartPause}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
