'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UseCountdownTimer } from './hooks/use-countdown-timer';
import { notifications } from '@mantine/notifications';
import { useCreateFocusRecord } from './api/use-create-focus-record';
import { Box } from '@mantine/core';
import MainView from './components/main-view';
import { ToolBar } from './components/toolbar';
import DrawerFocusQueue from './components/drawer-focus-queue';
import { useFocusList, FocusContextType } from './hooks/use-focus-list';
import ModalTimeUp from './components/modal-time-up';
import { useDisclosure } from '@mantine/hooks';

const timerOpts = [
  ,
  { label: 'demo', value: 10 },

  { label: '5 mins', value: 10 * 60 },

  { label: '15 mins', value: 5 * 60 },
  { label: '25 mins', value: 25 * 60 },
];

interface PomodoroContextType extends FocusContextType {
  formatTime: (sec: string) => { mins: string; secs: string };
  time: number;
  onReset: () => void;
  isRunning: boolean;
  onPause: () => void;
  onSetTime: (time: number) => void;
  isOngoing: boolean;
  onSaveRecord: () => void;
  onStart: () => void;
  focusListOpened: boolean;
  timerOpts: typeof timerOpts;
  timerSecs: number;
  onTimerChange: (secs: number) => void;
  onFocusListOpenChange: (opened: boolean) => void;
}

export const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export default function PomodoroTimer() {
  const [timeUpModalOpened, { open: openTimUpModal, close: closeTimUpModal }] =
    useDisclosure(false);
  const [timerSecs, setTimeSecs] = useState(timerOpts[timerOpts.length]?.value);
  const [focusListOpened, setFocusListOpened] = useState(false);
  const [introModalOpened, { toggle: toggleIntroModal }] = useDisclosure(false);

  const { focusList, addFocus, deleteFocus, toggleFocus } = useFocusList();
  const {
    time,
    handleReset,
    isRunning,
    handleStartPause,
    handleSetTime,
    formatTime,
    isOngoing,
    onTimerUp,
  } = UseCountdownTimer(timerSecs);
  const { mutate } = useCreateFocusRecord();

  useEffect(() => {
    onTimerUp(openTimUpModal);
  }, []);

  const saveRecord = () => {
    mutate(
      {
        form: {
          date: new Date(),
          mins: timerSecs,
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

  useEffect(() => {
    console.log(timerSecs);
  }, [timerSecs]);

  return (
    <PomodoroContext.Provider
      value={{
        timerSecs,
        timerOpts,
        onTimerChange: setTimeSecs,
        isRunning,
        isOngoing,
        formatTime,
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
        introModalOpened,
        toggleIntroModal,
      }}
    >
      {!isRunning && <ToolBar />}

      <MainView />
      <DrawerFocusQueue />
      <ModalTimeUp opened={timeUpModalOpened} close={closeTimUpModal} />
    </PomodoroContext.Provider>
  );
}
