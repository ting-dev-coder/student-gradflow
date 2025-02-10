import { dateFormat } from '@/lib/utils';
import { Box, Image, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { differenceInDays } from 'date-fns';
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
      <Image src={event?.localImagePath} h="100%" />
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
        w="min(488px,80%)"
        h="fit-content"
        m="auto"
        p="xl"
        bg="rgba(189, 189, 189, 0.2)"
        style={{
          backdropFilter: ' blur(2px)',
        }}
        c="#fff"
        shadow="lg"
      >
        <Stack align="center" gap="sm">
          <Text className="text-shadow" fz="max(16px, 2.25vw)">
            {event?.name}
          </Text>
          <Text
            className="text-shadow "
            lh={0.8}
            fz={`max(56px,${fullView ? '25vw' : '15vw'} )`}
          >
            {differenceInDays(dateFormat(event?.endAt), new Date())}
          </Text>
          <Text fz="max(16px, 2vw) " className="text-shadow ">
            {dateFormat(event?.endAt)}
          </Text>
        </Stack>
      </Paper>
    </Box>
  );
};

export default MainCountdown;
