import { dateFormat } from '@/lib/utils';
import {
  Box,
  Center,
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
  imageUrl?: File | undefined;
  name: string;
  endAt: string;
  localImagePath?: string;
}

interface EventProps {
  event: EventI;
  onFullViewChange: () => void;
  fullView: boolean;
  updating: boolean;
}

const MainCountdown = ({
  loading,
  event,
  fullView,
  onFullViewChange,
  updating,
}: EventProps) => {
  const { mutate } = useEditCountdown();
  if ((!event && loading) || updating)
    return (
      <Box flex={1} pos="relative" h="100%" c="var(--warning)">
        <Skeleton h="100%"></Skeleton>;
      </Box>
    );
  if (!event) {
    return (
      <Center flex={1} pos="relative" h="100%">
        <Stack c="var(--gray3)">
          <Image mx="auto" w="200px" src="/no-data.svg" />
          <Text>No data found. Start by adding a new event!</Text>
        </Stack>
      </Center>
    );
  }

  function handleUpdateDate(value, callback) {
    mutate(
      {
        form: { endAt: value?.toISOString() },
        param: { countdownId: event.$id },
      },
      {
        onSettled: () => {
          callback();
        },
      }
    );
  }

  return (
    <Box flex={1} pos="relative" h="100%" c="var(--warning)">
      <Image src={event?.localImagePath || event?.imageUrl} h="100%" />
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
