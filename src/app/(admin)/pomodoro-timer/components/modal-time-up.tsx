import { Button, Modal, Title, Text, Stack, Image } from '@mantine/core';

export default function ModalTimeUp({ opened, close }) {
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
        <Button color="var(--accent)" tt="uppercase" onClick={close}>
          i go it
        </Button>
      </Stack>
    </Modal>
  );
}
