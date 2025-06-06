'use client';
import React, { createContext, useEffect, useState } from 'react';
import { UseCountdownTimer } from './hooks/use-countdown-timer';
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
  onStop: () => void;
  onSetTime: (time: number) => void;
  isOngoing: boolean;
  onStart: () => void;
  focusListOpened: boolean;
  timerOpts: typeof timerOpts;
  timerSecs: number;
  onTimerChange: (secs: number) => void;
  onFocusListOpenChange: (opened: boolean) => void;
  focusTaskId: string;
  setFocusTaskId: (id: string) => void;
  introModalOpened: boolean;
  toggleIntroModal: () => void;
}

export const PomodoroContext = createContext<PomodoroContextType>({
  formatTime: () => ({ mins: '00', secs: '00' }),
  time: 0,
  onReset: () => {},
  isRunning: false,
  onPause: () => {},
  onStop: () => {},
  onSetTime: () => {},
  isOngoing: false,
  onStart: () => {},
  focusListOpened: false,
  timerOpts: timerOpts,
  timerSecs: timerOpts[1]?.value || 0, // 預設為 'demo' 選項
  onTimerChange: () => {},
  onFocusListOpenChange: () => {},
  focusTaskId: '',
  setFocusTaskId: () => {},

  // focus queue 預設
  focusList: [],
  addFocus: () => {},
  deleteFocus: () => {},
  toggleFocus: () => {},
  // intro modal
  introModalOpened: false,
  toggleIntroModal: () => {},
});

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
    handleStop,
    onTimerUp,
  } = UseCountdownTimer(timerSecs);

  useEffect(() => {
    onTimerUp(() => {
      openTimUpModal();
    });
  }, []);

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
        onStop: handleStop,
        onReset: handleReset,
        onPause: handleStartPause,
        onSetTime: handleSetTime,
        onStart: handleStartPause,
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
      {!isRunning && !isOngoing && <ToolBar />}
      <MainView />
      <DrawerFocusQueue />
      <ModalTimeUp opened={timeUpModalOpened} close={closeTimUpModal} />
    </PomodoroContext.Provider>
  );
}
