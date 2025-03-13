import { Box, Button, Group, Select, SimpleGrid } from '@mantine/core';
import { useDeleteCountdownEvent } from '../api/use-delete-countdown-event';
import ModalAddEvent from './modal-add-event';
import EventCard from './event-card';
import CardSkeleton from '@/components/card-skeleton';
import dayjs from 'dayjs';
import { useState } from 'react';

const SORTED_OPTIONS = [
  { label: 'Soonest → Latest', value: 'ascending' },
  { label: 'Latest → Soonest', value: 'descending' },
];

const CountdownList = ({ events, loading, setEventUpdate }) => {
  // const { mutate: updateMutate } = useUpdateCountdownEvent();
  const { mutate: deleteMutate, isPending: deleteLoading } =
    useDeleteCountdownEvent();
  const [sortBy, setSortBy] = useState(SORTED_OPTIONS[0].value);

  const sortedEvents = [...events].sort((a, b) => {
    const timeA = dayjs(a.endAt, 'h:mm a').unix();
    const timeB = dayjs(b.endAt, 'h:mm a').unix();

    return sortBy === 'ascending' ? timeA - timeB : timeB - timeA;
  });

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
      <Group justify="space-between">
        <ModalAddEvent>
          <Button mt="sm" color="var(--accent)">
            Add Event
          </Button>
        </ModalAddEvent>
        <Select
          label="Sort by Time "
          value={sortBy}
          data={SORTED_OPTIONS}
          onChange={(val) => {
            if (!val) return;
            setSortBy(val);
          }}
        />
      </Group>

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
          {sortedEvents?.map((event, idx) => {
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
