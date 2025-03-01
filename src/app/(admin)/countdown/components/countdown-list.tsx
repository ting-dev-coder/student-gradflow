import {
  Box,
  Button,
  CardSection,
  FileInput,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Skeleton,
} from '@mantine/core';
import { useDeleteCountdownEvent } from '../api/use-delete-countdown-event';
import ModalAddEvent from './modal-add-event';
import EventCard from './event-card';
import CardSkeleton from '@/components/card-skeleton';

const CountdownList = ({ events, loading, setEventUpdate }) => {
  // const { mutate: updateMutate } = useUpdateCountdownEvent();
  const { mutate: deleteMutate, isPending: deleteLoading } =
    useDeleteCountdownEvent();

  const isLoading = deleteLoading || loading;

  const onDelete = (countdownId: string) => {
    deleteMutate(
      { param: { countdownId: countdownId } },
      {
        onSuccess: () => {
          console.log('successfully deleted');
        },
      }
    );
  };

  return (
    <Box flex={1} pr="sm">
      <ModalAddEvent>
        <Button mt="sm" color="var(--accent)">
          Add Event
        </Button>
      </ModalAddEvent>
      {isLoading ? (
        <CardSkeleton
          mt="md"
          height="212px"
          amount={6}
          span={4}
          gutter="md"
          visible={true}
        />
      ) : (
        <SimpleGrid
          mt="md"
          cols={{
            base: 1,
            md: 2,
            xl: 3,
          }}
          spacing="md"
        >
          {events?.map((event, idx) => {
            return (
              <EventCard
                key={`event-${idx}`}
                event={event}
                onDelete={onDelete}
                loading={loading}
                setEventUpdate={setEventUpdate}
              />
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default CountdownList;
