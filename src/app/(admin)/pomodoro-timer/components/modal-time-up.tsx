import { Button, Modal, Title, Text, Stack, Image } from '@mantine/core';
import { useAudioPlayer } from '../hooks/use-audio-loop';
import { useContext, useEffect } from 'react';
import { PomodoroContext } from '../page';
import { useCreateFocusRecord } from '../api/use-create-focus-record';

export default function ModalTimeUp({ opened, close }) {
  const context = useContext(PomodoroContext);
  if (!context) return;
  const { alertSound, timerSecs, onStop } = context;
  const { mutate } = useCreateFocusRecord();

  const { playAudio, stopAudio } = useAudioPlayer();
  useEffect(() => {
    if (!opened || !alertSound) return;
    playAudio(alertSound);
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    mutate(
      {
        form: {
          date: new Date(),
          mins: timerSecs,
        },
      },
      []
    );
  }, [opened]);
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
        />
        <Title ta="center">Awesome work! </Title>
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
          i go it
        </Button>
      </Stack>
    </Modal>
  );
}
