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

const CountdownList = ({ events, loading }) => {
  // const { mutate: updateMutate } = useUpdateCountdownEvent();
  const { mutate: deleteMutate, isPending: deleteLoading } =
    useDeleteCountdownEvent();

  const isLoading = deleteLoading || loading;

  // const onUpdate = (taskId: string) => {
  // 	updateMutate(
  // 		{ form: { name: "測試 to do 更新" }, param: { taskId: taskId } },
  // 		{
  // 			onSuccess: () => {
  // 				console.log("成功");
  // 			},
  // 		}
  // 	);
  // };

  const onDelete = (countdownId: string) => {
    deleteMutate(
      { param: { countdownId: countdownId } },
      {
        onSuccess: () => {
          console.log('成功');
        },
      }
    );
  };

  return (
    <Box flex={1}>
      <ModalAddEvent>
        <Button>新增</Button>
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
          {events?.map((event) => {
            return <EventCard event={event} onDelete={onDelete} />;
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default CountdownList;
