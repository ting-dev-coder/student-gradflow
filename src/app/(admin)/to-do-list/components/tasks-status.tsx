import { Card, Text, SimpleGrid, Stack, Skeleton } from '@mantine/core';

interface TaskStatus {
  data: {
    status: string;
  }[];
  loading: boolean;
}

const TaskStatus = ({ data = [], loading }: TaskStatus) => {
  const done = data.filter((task) => task.status === 'done').length;

  const toDo = data.filter((task) => task.status === 'to-do').length;

  const inProgress = data.filter(
    (task) => task.status === 'in-progress'
  ).length;
  return (
    <SimpleGrid mx="auto" cols={3} w="80%">
      <Skeleton visible={loading}>
        <Card shadow="sm">
          <Stack gap="0">
            <Text>To-do</Text>
            <Text>{toDo}</Text>
          </Stack>
        </Card>
      </Skeleton>

      <Skeleton visible={loading}>
        <Card shadow="sm">
          <Stack gap="0">
            <Text>In progress</Text>
            <Text>{inProgress}</Text>
          </Stack>
        </Card>
      </Skeleton>

      <Skeleton visible={loading}>
        <Card shadow="sm">
          <Stack gap="0">
            <Text>Done</Text>
            <Text>{done}</Text>
          </Stack>
        </Card>
      </Skeleton>
    </SimpleGrid>
  );
};

export default TaskStatus;
