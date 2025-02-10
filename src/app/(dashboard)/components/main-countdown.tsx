import { dateFormat } from '@/lib/utils';
import { BackgroundImage, Box, Center, Stack, Text } from '@mantine/core';
import { differenceInDays } from 'date-fns';

const MainCountdown = ({ event }) => {
  return (
    <BackgroundImage py="sm" src={event.localImagePath} radius="sm" h="100%">
      <Center h={'100%'} c="#fff">
        <Stack gap="sm">
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
      </Center>
    </BackgroundImage>
  );
};

export default MainCountdown;
