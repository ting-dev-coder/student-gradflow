'use client';
import React, { createContext, useContext, useState } from 'react';
import { UseCountdownTimer } from './hooks/use-countdown-timer';
import { notifications } from '@mantine/notifications';
import { useCreateFocusRecord } from './api/use-create-focus-record';
import { Box } from '@mantine/core';
import MainView from './components/main-view';
import { ToolBar } from './components/toolbar';
import DrawerFocusQueue from './components/drawer-focus-queue';
import { useFocusList, FocusContextType } from './hooks/use-focus-list';

const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 10 * 60,
  demo: 3,
};

interface PomodoroContextType extends FocusContextType {
  mode: string;
  setMode: (mode: string) => void;
  formattedTime: { mins: string; secs: string };
  time: number;
  onReset: () => void;
  isRunning: boolean;
  onPause: () => void;
  onSetTime: (time: number) => void;
  isOngoing: boolean;
  onSaveRecord: () => void;
  onStart: () => void;
  focusListOpened: boolean;
  onFocusListOpenChange: (opened: boolean) => void;
}

export const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export default function PomodoroTimer() {
  const [focusListOpened, setFocusListOpened] = useState(false);
  const [mode, setMode] = useState('pomodoro');

  const { focusList, addFocus, deleteFocus, toggleFocus } = useFocusList();
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

  const saveRecord = () => {
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
  };

  return (
    <PomodoroContext.Provider
      value={{
        mode,
        isRunning,
        isOngoing,
        setMode,
        formattedTime: formatTime(time),
        time: time,
        onReset: handleReset,
        onPause: handleStartPause,
        onSetTime: handleSetTime,
        onStart: handleStartPause,
        onSaveRecord: saveRecord,
        focusListOpened,
        onFocusListOpenChange: setFocusListOpened,
        focusList,
        addFocus,
        deleteFocus,
        toggleFocus,
      }}
    >
      {!isRunning && !isOngoing && <ToolBar />}

      <MainView />
      <DrawerFocusQueue />
    </PomodoroContext.Provider>
  );
}
