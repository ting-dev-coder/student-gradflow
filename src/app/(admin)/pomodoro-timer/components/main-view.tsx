import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Stack,
  TextInput,
  Title,
  Text,
  Box,
  Paper,
  Select,
} from '@mantine/core';
import { IoMdAdd } from 'react-icons/io';
import { UseCountdownTimer } from '../hooks/use-countdown-timer';
import { MdOutlineRestartAlt } from 'react-icons/md';
import { IoPause, IoStop } from 'react-icons/io5';
import { IoMdPlay } from 'react-icons/io';
import { useContext, useState } from 'react';
import { PomodoroContext } from '../page';
import React from 'react';
import type { Focus } from '../hooks/use-focus-list';
import FocusMask from './focus-mask';
import styles from '../pomodoro-timer.module.scss';

function parseFocusData(data) {
  return data
    .filter((t) => !t.completed)
    .map((task) => ({
      completed: false,
      label: task.text,
      value: task.id,
    }));
}

function CountdownView({
  selectedFocusTask = [],
}: {
  selectedFocusTask: Object;
}) {
  const context = useContext(PomodoroContext);
  if (!context) return;
  const { onPause, onReset, onStop, isRunning, time, formatTime, isOngoing } =
    context;

  const isTimerRunning = isOngoing || isRunning;

  return (
    <Stack gap={0} pos={'relative'}>
      <Stack
        gap={0}
        pos={'relative'}
        justify="center"
        align="center"
        top={10}
        style={{ zIndex: isTimerRunning ? 10 : -1 }}
      >
        {isTimerRunning && (
          <Stack gap="0">
            {selectedFocusTask?.text && (
              <Title ta="center" c="#fff">
                {selectedFocusTask.text}
              </Title>
            )}
            <Text ta="center" c="#fff">
              Focus Time Remaining
            </Text>
          </Stack>
        )}

        <Group w="28vw" maw="600px" justify="center" pos={'relative'}>
          <Paper py="xs" radius={12} px="md" bg="var(--primary)">
            <Text lh="1" fz="4rem" c="#fff" ta="center">
              {formatTime(time).mins}
            </Text>
          </Paper>
          <Text c="var(--primary)" fz="5rem">
            :
          </Text>
          <Paper py="xs" radius={12} px="md" bg="var(--primary)">
            <Text lh="1" fz="4rem" c="#fff" ta="center">
              {formatTime(time).secs}
            </Text>
          </Paper>
        </Group>
      </Stack>
      <Image h="300px" fit="contain" src="/desktop.svg" />
      {/* <Image maw="100%" src={'/desktop.svg'} /> */}
      <Box className={(isTimerRunning && styles['desktop-mask']) || ''} />
      {isTimerRunning && (
        <Group
          pos={'relative'}
          style={{ zIndex: 9 }}
          mb="md"
          mt="sm"
          justify="center"
          gap={'sm'}
        >
          <ActionIcon variant="transparent" onClick={onReset}>
            <MdOutlineRestartAlt color="var(--accent)" size={120} />
          </ActionIcon>

          <Button
            bg="#fff"
            px="xl"
            color="var(--accent)"
            size="compact-xl"
            variant="transparent"
            onClick={onPause}
          >
            {isRunning ? (
              <IoPause size={32} />
            ) : (
              isOngoing && <IoMdPlay size={32} />
            )}
          </Button>

          <ActionIcon variant="transparent" onClick={onStop}>
            <IoStop size={32} color="white" />
          </ActionIcon>
        </Group>
      )}
    </Stack>
  );
}

export default function MainView() {
  const context = useContext(PomodoroContext);
  if (!context) return;

  const {
    onStart,
    isOngoing,
    isRunning,
    focusList,
    focusTaskId,
    setFocusTaskId,
  } = context;

  const selectedFocusTask = focusList.find((t) => t.id === focusTaskId);
  const isTimerRunning = isOngoing || isRunning;

  return (
    <Group mih={'100vh'} justify="center" gap="0">
      <CountdownView selectedFocusTask={selectedFocusTask} />

      {!isTimerRunning && (
        <Stack pl="xl">
          <Title pl="sm" style={{ borderLeft: '5px solid var(--warning)' }}>
            Time to Focus!
          </Title>

          <Select
            data={parseFocusData(focusList)}
            value={selectedFocusTask?.id}
            onChange={(taskId) => {
              console.log('set', taskId);
              setFocusTaskId(taskId);
            }}
          />

          <Button color="var(--warning)" onClick={onStart}>
            Start
          </Button>
        </Stack>
      )}
    </Group>
  );
}
