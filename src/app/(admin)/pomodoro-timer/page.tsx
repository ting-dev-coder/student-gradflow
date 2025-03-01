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
import { useAudioPlayer } from './hooks/use-audio-loop';

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
  focusTaskId: string;
  setFocusTaskId: (id: string) => void;
}

export const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export default function PomodoroTimer() {
  // time up modal
  const [timeUpModalOpened, { open: openTimUpModal, close: closeTimUpModal }] =
    useDisclosure(false);
  // time session
  const [timerSecs, setTimeSecs] = useState(timerOpts[timerOpts.length]?.value);
  // focus queue
  const [focusListOpened, setFocusListOpened] = useState(false);
  // focus queue hook
  const { focusList, addFocus, deleteFocus, toggleFocus } = useFocusList();
  const [focusTaskId, setFocusTaskId] = useState('');
  // how it work
  const [introModalOpened, { toggle: toggleIntroModal }] = useDisclosure(false);

  // alert sound
  const [alertSound, setAlertSound] = useState('');

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

  return (
    <PomodoroContext.Provider
      value={{
        timerSecs,
        timerOpts,
        onTimerChange: setTimeSecs,
        isRunning,
        isOngoing,
        formatTime,
        alertSound,
        onAlertSoundChange: setAlertSound,
        time: time,
        onReset: handleReset,
        onPause: handleStartPause,
        onSetTime: handleSetTime,
        onStart: handleStartPause,
        onSaveRecord: saveRecord,
        focusListOpened,
        onFocusListOpenChange: setFocusListOpened,
        focusList,
        focusTaskId,
        setFocusTaskId,
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
