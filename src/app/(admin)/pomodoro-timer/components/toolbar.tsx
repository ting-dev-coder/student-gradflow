'use client';

import {
  ActionIcon,
  Box,
  CheckIcon,
  Combobox,
  Divider,
  Group,
  Input,
  InputBase,
  Menu,
  Paper,
  Tooltip,
} from '@mantine/core';
import { useContext, useEffect } from 'react';
import { BiSolidBellRing } from 'react-icons/bi';
import { MdOutlinePlayCircleFilled } from 'react-icons/md';
import { FaListCheck } from 'react-icons/fa6';
import { MdInfo } from 'react-icons/md';
import { RiTimerLine } from 'react-icons/ri';
import { PomodoroContext } from '../page';
import ModalHowItWorks from './modal-how-it-works';
import { useAudioPlayer } from '../hooks/use-audio-loop';

const audioFiles = [
  { label: 'alarm clock 1', value: '/alarm-clock-1.mp3' },
  { label: 'alarm clock 2', value: '/alarm-clock-2.mp3' },
  { label: 'chiptune', value: '/chiptune.mp3' },
  { label: 'hand clock', value: '/hand-clock.mp3' },
  { label: 'imminent', value: '/imminent.mp3' },
  { label: 'lofi clock', value: '/lofi-clock.mp3' },
  { label: 'morning joy', value: '/morning-joy.mp3' },
  { label: 'wonderful morning', value: '/wonderful-morning.mp3' },
  { label: 'ringtone', value: '/ringtone.mp3' },
  { label: 'soft plucks', value: '/soft-plucks.mp3' },
];

export function ToolBar() {
  const { playAudio, stopAudio } = useAudioPlayer();
  const context = useContext(PomodoroContext);
  if (!context) {
    return <div>Error: PomodoroContext is not available.</div>;
  }

  const {
    onFocusListOpenChange,
    onTimerChange,
    timerOpts,
    introModalOpened,
    toggleIntroModal,
    alertSound,
    onAlertSoundChange,
  } = context;
  const selectAudio = audioFiles.find((a) => a.value === alertSound);

  useEffect(() => {
    const hasLandBefore = localStorage.getItem('is-land-before');

    if (!hasLandBefore) {
      localStorage.setItem('is-land-before', 'true');
      toggleIntroModal();
    }
  }, [toggleIntroModal]);

  function onSoundPlayClick(src: string) {
    onAlertSoundChange(src);
    playAudio(src);
  }
  function handleAlertSoundClose() {
    stopAudio();
  }
  return (
    <Paper
      mt="xs"
      mr="xs"
      w="fit-content"
      radius={20}
      py="xs"
      px="xl"
      ml="auto"
      bg="#fff"
    >
      <Group gap="sm">
        {/* intro */}
        <Tooltip label="How the Pomodoro Timer works">
          <ActionIcon
            variant="transparent"
            onClick={() => toggleIntroModal(true)}
          >
            <MdInfo color="var(--gray2)" size={'24'} />
          </ActionIcon>
        </Tooltip>
        <Divider orientation="vertical" />
        {/* focus list */}
        <Tooltip label="open focus list">
          <ActionIcon
            variant="transparent"
            onClick={() => onFocusListOpenChange(true)}
          >
            <FaListCheck size={'20'} color="var(--gray2" />
          </ActionIcon>
        </Tooltip>
        {/* timer  */}
        <Menu trigger="hover" openDelay={100} closeDelay={400}>
          <Menu.Target>
            <ActionIcon variant="transparent">
              <RiTimerLine size={'24'} color="var(--gray2" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            {timerOpts.map((t, idx) => (
              <Menu.Item
                key={`timer-opt-${idx}`}
                onClick={() => onTimerChange(t.value)}
              >
                {t.label}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        {/* alert sound */}
        <Menu
          trigger="hover"
          closeOnClickOutside
          onClose={handleAlertSoundClose}
        >
          <Menu.Target>
            <InputBase
              miw={232}
              component="button"
              type="button"
              variant="filled"
              pointer
              leftSection={<BiSolidBellRing size={'16'} color="var(--gray2" />}
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
            >
              {selectAudio?.label || 'Please select alert sound'}
            </InputBase>
          </Menu.Target>
          <Menu.Dropdown miw={195}>
            <Menu.Label>Alert Sounds</Menu.Label>
            {audioFiles.map((audio, idx) => (
              <Group key={`audio-file-${idx}`} gap={0} wrap="nowrap">
                <Menu.Item onClick={() => onAlertSoundChange(audio.value)}>
                  {audio.label}
                </Menu.Item>
                <ActionIcon
                  variant="white"
                  color="var(--gray2)"
                  aria-label="Settings"
                  onClick={() => onSoundPlayClick(audio.value)}
                >
                  <MdOutlinePlayCircleFilled size={24} />
                </ActionIcon>
              </Group>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Group>
      <ModalHowItWorks
        opened={introModalOpened}
        close={() => toggleIntroModal(false)}
      />
    </Paper>
  );
}
