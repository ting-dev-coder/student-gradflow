import { Box, Image, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

export interface EventI {
  image: string;
}

interface EventProps {
  event: EventI;
  onFullViewChange: () => void;
  fullView: boolean;
}
{
  /* <Box>{!event?.image ? "暫無圖片" : <Image src={event.image} />}</Box> */
}
const MainCountdown = ({ event, fullView, onFullViewChange }: EventProps) => {
  return (
    <Box flex={1} pos="relative" h="100%" c="var(--warning)">
      <Image src="countdown-image-4.jpg" h="100%" />
      <UnstyledButton
        pos="absolute"
        top="0"
        right=".5rem"
        c="#fff"
        onClick={onFullViewChange}
      >
        {fullView ? (
          <MdFullscreen size="28px" />
        ) : (
          <MdFullscreenExit size="28px" />
        )}
      </UnstyledButton>
      <Paper
        pos={'absolute'}
        inset={0}
        w="fit-content"
        h="fit-content"
        m="auto"
        p="lg"
        bg="rgba(189, 189, 189, 0.2)"
        style={{
          backdropFilter: ' blur(2px)',
        }}
        c="#fff"
        shadow="lg"
      >
        <Stack align="center">
          <Text>Graduation</Text>
          <Text>79</Text>
          <Text>2025-04-08 Tuesday</Text>
        </Stack>
      </Paper>
    </Box>
  );
};

export default MainCountdown;
