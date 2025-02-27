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
} from '@mantine/core';
import { IoMdAdd } from 'react-icons/io';
import { UseCountdownTimer } from '../hooks/use-countdown-timer';
import { MdOutlineRestartAlt } from 'react-icons/md';
import { IoPause } from 'react-icons/io5';
import { IoMdPlay } from 'react-icons/io';
import { useContext, useState } from 'react';
import { PomodoroContext } from '../page';
import React from 'react';

function CountdownView() {
  const context = useContext(PomodoroContext);
  if (!context) return;
  const { onPause, onReset, isRunning, time, formatTime, isOngoing } = context;
  console.log('countdown view', time, formatTime(time));
  return (
    <Stack gap={0} w="28vw" maw="600px">
      <Stack gap={0}>
        {isRunning && (
          <Stack gap="0">
            <Title ta="center" c="#fff">
              Homework
            </Title>
            <Text ta="center" c="#fff">
              Focus Time Remaining
            </Text>
          </Stack>
        )}

        <Group>
          <Paper py="xs" radius={12} px="md" bg="var(--primary)">
            <Text lh="1" fz="4rem" c="#fff" ta="center">
              {formatTime(time).mins}
            </Text>
          </Paper>
          <Text fz="5rem">:</Text>
          <Paper py="xs" radius={12} px="md" bg="var(--primary)">
            <Text lh="1" fz="4rem" c="#fff" ta="center">
              {formatTime(time).secs}
            </Text>
          </Paper>
        </Group>
      </Stack>
      <Image maw="100%" src={'/desktop.svg'} />

      <Group mt="md" justify="center" gap={'sm'}>
        {isRunning && (
          <ActionIcon variant="transparent" onClick={onReset}>
            <MdOutlineRestartAlt size={32} />
          </ActionIcon>
        )}
        {isRunning && (
          <Button
            bg="#fff"
            px="xl"
            size="compact-xl"
            variant="transparent"
            onClick={onPause}
          >
            {isRunning ? (
              <IoPause size={24} />
            ) : (
              isOngoing && <IoMdPlay size={24} />
            )}
          </Button>
        )}
      </Group>
    </Stack>
  );
}

export default function MainView() {
  const context = useContext(PomodoroContext);
  if (!context) return;
  const [taskText, setTaskText] = useState('');
  const { onStart, isRunning, addFocus, onFocusListOpenChange } = context;
  return (
    <Group justify="center" gap="0">
      <CountdownView />

      {!isRunning && (
        <Stack pl="xl">
          <Title pl="sm" style={{ borderLeft: '5px solid var(--warning)' }}>
            Time to Focus!
          </Title>

          <Group gap="xs">
            <TextInput
              flex={1}
              value={taskText}
              onChange={(event) => setTaskText(event.currentTarget.value)}
            />
            <ActionIcon
              color="var(--warning)"
              variant="subtle"
              onClick={() => {
                addFocus(taskText);
                setTaskText('');
                onFocusListOpenChange(true);
              }}
            >
              <IoMdAdd />
            </ActionIcon>
          </Group>

          <Button color="var(--warning)" onClick={onStart}>
            Start
          </Button>
        </Stack>
      )}
    </Group>
  );
}
