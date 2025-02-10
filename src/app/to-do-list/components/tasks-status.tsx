import { Card, Text, SimpleGrid, Stack } from '@mantine/core';

interface TaskStatus {
  data: [];
}

const TaskStatus = ({ data = [] }: TaskStatus) => {
  const done = data.filter((task) => task.status === 'done').length;

  const toDo = data.filter((task) => task.status === 'to-do').length;

  const inProgress = data.filter(
    (task) => task.status === 'in-progress'
  ).length;
  return (
    <SimpleGrid mx="auto" cols={3} w="80%">
      <Card shadow="sm">
        <Stack gap="0">
          <Text>To-do</Text>
          <Text>{toDo}</Text>
        </Stack>
      </Card>
      <Card shadow="sm">
        <Stack gap="0">
          <Text>In progress</Text>
          <Text>{inProgress}</Text>
        </Stack>
      </Card>
      <Card shadow="sm">
        <Stack gap="0">
          <Text>Done</Text>
          <Text>{done}</Text>
        </Stack>
      </Card>
    </SimpleGrid>
  );
};

export default TaskStatus;
