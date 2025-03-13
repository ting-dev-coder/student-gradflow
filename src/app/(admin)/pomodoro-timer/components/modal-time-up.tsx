import { Button, Modal, Title, Text, Stack, Image } from '@mantine/core';
import { useAudioPlayer } from '../hooks/use-audio-loop';
import { useContext, useEffect } from 'react';
import { PomodoroContext } from '../page';
import { useCreateFocusRecord } from '../api/use-create-focus-record';

export default function ModalTimeUp({ opened, close }) {
  // Always call hooks at the top level, unconditionally
  const { mutate } = useCreateFocusRecord();
  const { playAudio, stopAudio } = useAudioPlayer();

  const context = useContext(PomodoroContext);

  const { alertSound = '', timerSecs = 0, onStop = () => {} } = context;

  // Effect to play audio when alertSound is available
  useEffect(() => {
    if (!opened || !alertSound) return;
    playAudio(alertSound);
  }, [opened, alertSound, playAudio]); // 確保包括必要的依賴

  // Effect to record focus when the modal opens
  useEffect(() => {
    if (!opened) return;
    mutate({
      form: {
        date: new Date(),
        mins: timerSecs,
      },
    });
  }, [opened, mutate, timerSecs]); // 包含必要的依賴

  return (
    <Modal
      style={{ '--mantine-color-body': '#fff' }}
      opened={opened}
      onClose={close}
      centered
    >
      <Stack gap="xs">
        <Image
          style={{ objectFit: 'contain' }}
          h={'220px'}
          flex={'unset'}
          src="take-break-coffee.svg"
          alt="A cup of coffee to signify break time" // Added alt text for accessibility
        />
        <Title ta="center">Awesome work!</Title>
        <Text ta="center">Enjoy a well-deserved 15 minute break</Text>
        <Button
          color="var(--accent)"
          tt="uppercase"
          onClick={() => {
            stopAudio();
            onStop();
            close();
          }}
        >
          I got it
        </Button>
      </Stack>
    </Modal>
  );
}
