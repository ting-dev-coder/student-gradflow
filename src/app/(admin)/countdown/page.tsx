'use client';
import { useGetCountdownEvents } from './api/use-get-countdown-events';
import { Group, Image, ScrollArea, Title } from '@mantine/core';
import { useRef, useState } from 'react';
import CountdownList from './components/countdown-list';
import MainCountdown from './components/main-countdown';

import { motion } from 'framer-motion';
const Countdown = () => {
  const [eventUpdate, setEventUpdate] = useState(false);
  const [fullView, setFullView] = useState(false);
  const {
    data: countdownEvents,
    error,

    isPending: isLoading,
    isError,
  } = useGetCountdownEvents(false, setEventUpdate);
  const mainEvent =
    (countdownEvents?.documents || []).find((event) => event.isMain) ||
    countdownEvents?.documents[0];
  const noMainList = (countdownEvents?.documents || []).filter(
    (event) => !event.isMain
  );

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  function handleFullView() {
    setFullView((prev) => !prev);
  }

  return (
    <Group
      h="calc(100vh - var(--app-shell-header-height, 0px))"
      align="flex-start"
      gap={'sm'}
    >
      <MainCountdown
        event={mainEvent}
        onFullViewChange={handleFullView}
        fullView={fullView}
        loading={isLoading}
        updating={eventUpdate}
      />
      <motion.div
        initial={{ opacity: 1, flex: 1, display: 'flex', height: '100%' }}
        animate={{
          opacity: fullView ? 0 : 1,
          flex: fullView ? 0 : 1,
          width: 0,
          display: fullView ? 'none' : 'flex',
        }}
        transition={{ duration: 0.2 }}
      >
        <ScrollArea h="100%" w={'100%'}>
          <Title>Countdown</Title>
          <CountdownList
            setEventUpdate={setEventUpdate}
            loading={isLoading}
            events={noMainList}
          />
        </ScrollArea>
      </motion.div>
    </Group>
  );
};

export default Countdown;
