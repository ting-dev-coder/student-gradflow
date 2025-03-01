import { dateFormat } from '@/lib/utils';
import {
  BackgroundImage,
  Box,
  Center,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { differenceInDays } from 'date-fns';

const MainCountdown = ({ event }) => {
  return (
    <BackgroundImage
      py="sm"
      src={event.localImagePath || event.imageUrl}
      radius="sm"
      h="100%"
    >
      <Paper
        w="70%"
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
        <Stack gap="sm" ta="center">
          <Text className="text-shadow" fz="max(16px, 2.25vw)">
            {event?.name}
          </Text>
          <Text className="text-shadow " inline fz={`max(56px,10vw)`}>
            {differenceInDays(dateFormat(event?.endAt), new Date())}
          </Text>
          <Text fz="max(16px, 2vw) " className="text-shadow ">
            {dateFormat(event?.endAt)}
          </Text>
        </Stack>
      </Paper>
    </BackgroundImage>
  );
};

export default MainCountdown;
