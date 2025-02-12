import { dateFormat } from '@/lib/utils';
import {
  Box,
  Image,
  Paper,
  Skeleton,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { differenceInDays, parseISO } from 'date-fns';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { useEditCountdown } from '../api/use-edit-countdown';
import EditableDateInput from './editable-date-input';

export interface EventI {
  image: string;
  name: string;
  endAt: string;
}

interface EventProps {
  event: EventI;
  onFullViewChange: () => void;
  fullView: boolean;
}
{
  /* <Box>{!event?.image ? "暫無圖片" : <Image src={event.image} />}</Box> */
}
const MainCountdown = ({
  loading,
  event,
  fullView,
  onFullViewChange,
}: EventProps) => {
  if (!event && loading)
    return (
      <Box flex={1} pos="relative" h="100%" c="var(--warning)">
        <Skeleton h="100%" visible={loading}></Skeleton>;
      </Box>
    );

  const { mutate } = useEditCountdown();
  console.log('event', event);
  function handleUpdateDate(value, callback) {
    mutate(
      {
        form: { endAt: value?.toISOString() },
        param: { countdownId: event.$id },
      },
      {
        onSettled: () => callback(),
      }
    );
  }

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
            {differenceInDays(event?.endAt, new Date())}
          </Text>
          <EditableDateInput
            w="150px"
            size="md"
            defaultValue={parseISO(dateFormat(event?.endAt))}
            onChange={handleUpdateDate}
          />
        </Stack>
      </Paper>
    </Box>
  );
};

export default MainCountdown;
