'use client';

import { Text, Button, Center, Flex, Stack, Title, Box } from '@mantine/core';
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
    <Box px="xl" py="sm">
      <Title>Pomodoro Timer</Title>
      <Flex justify={'center'} align="center">
        <Stack pt="120px">
          <Text ta="center">{formatTime(time)}</Text>
          <Button onClick={handleStartPause}>
            {isRunning ? 'Pause' : isOngoing ? 'Resume' : 'Start'}
          </Button>
          {isOngoing && <Button onClick={handleReset}>Reset</Button>}
        </Stack>
      </Flex>
    </Box>
  );
}
