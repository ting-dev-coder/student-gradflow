'use client';

import { Text, Button, Center, Flex, Stack, Title, Box } from '@mantine/core';
import { UseCountdownTimer } from './hooks/use-countdown-timer';
import { useState } from 'react';
import { useCreateFocusRecord } from './api/use-create-focus-record';
import { notifications } from '@mantine/notifications';

const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 10 * 60,
  demo: 3,
};
export default function PomodoroTimer() {
  const [mode, setMode] = useState('pomodoro');
  const {
    time,
    handleReset,
    isRunning,
    handleStartPause,
    handleSetTime,
    formatTime,
    isOngoing,
  } = UseCountdownTimer();
  const { mutate } = useCreateFocusRecord();

  function onModeClick(mode: string) {
    setMode(mode);
    console.log(mode);
    handleSetTime(modes[mode]);
  }

  function handleSaveRecord() {
    mutate(
      {
        form: {
          date: new Date(),
          mins: Number(modes[mode]),
        },
      },
      {
        onSuccess: () => {
          notifications.show({
            message: 'Successfully Saved',
          });
          handleReset();
        },
      }
    );
  }
  return (
    <Box px="xl" py="sm">
      <Title>Pomodoro Timer</Title>
      <Flex justify={'center'} align="center">
        <Stack pt="120px">
          <Button.Group>
            <Button
              variant={mode === 'pomodoro' ? 'filled' : 'default'}
              onClick={() => onModeClick('pomodoro')}
            >
              Pomodoro
            </Button>
            <Button
              variant={mode === 'shortBreak' ? 'filled' : 'default'}
              onClick={() => onModeClick('shortBreak')}
            >
              Short break
            </Button>
            <Button
              variant={mode === 'longBreak' ? 'filled' : 'default'}
              onClick={() => onModeClick('longBreak')}
            >
              Long break
            </Button>
            <Button
              variant={mode === 'demo' ? 'filled' : 'default'}
              onClick={() => onModeClick('demo')}
            >
              3s for demo
            </Button>
          </Button.Group>
          <Text ta="center">{formatTime(time)}</Text>
          <Button onClick={handleStartPause}>
            {isRunning ? 'Pause' : isOngoing ? 'Resume' : 'Start'}
          </Button>

          {isOngoing && <Button onClick={handleReset}>Reset</Button>}

          {time === 0 && (
            <Button onClick={handleSaveRecord}>
              Record this session and reset
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
