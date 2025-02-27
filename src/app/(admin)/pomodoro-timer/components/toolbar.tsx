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
  Select,
  Tooltip,
  useCombobox,
} from '@mantine/core';
import { useClickOutside, useDisclosure, useHover } from '@mantine/hooks';
import { useContext, useEffect, useRef, useState } from 'react';
import { BiSolidBellRing } from 'react-icons/bi';
import { MdOutlinePlayCircleFilled } from 'react-icons/md';
import { FaListCheck } from 'react-icons/fa6';
import { MdInfo } from 'react-icons/md';
import { RiTimerLine } from 'react-icons/ri';
import { PomodoroContext } from '../page';
import ModalHowItWorks from './modal-how-it-works';

const groceries = [
  '🍎 Apples',
  '🍌 Bananas',
  '🥦 Broccoli',
  '🥕 Carrots',
  '🍫 Chocolate',
];

export function ToolBar() {
  const context = useContext(PomodoroContext);
  if (!context) return;
  const {
    onFocusListOpenChange,
    onTimerChange,
    timerOpts,
    introModalOpened,
    toggleIntroModal,
  } = context;

  const [alertSound, setAlertSound] = useState('wonderful morning');

  function onSoundPlayClick() {}
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
        <Menu trigger="hover" closeOnClickOutside>
          <Menu.Target>
            <InputBase
              miw={195}
              component="button"
              type="button"
              variant="filled"
              pointer
              leftSection={<BiSolidBellRing size={'16'} color="var(--gray2" />}
              rightSection={<Combobox.Chevron />}
              rightSectionPointerEvents="none"
            >
              {alertSound}
            </InputBase>
          </Menu.Target>
          <Menu.Dropdown miw={195}>
            <Menu.Label>Alert Sounds</Menu.Label>
            <Group gap={0} wrap="nowrap">
              <Menu.Item>Settings</Menu.Item>
              <ActionIcon
                variant="white"
                color="var(--gray2)"
                aria-label="Settings"
                onClick={onSoundPlayClick}
              >
                <MdOutlinePlayCircleFilled size={24} />
              </ActionIcon>
            </Group>
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
