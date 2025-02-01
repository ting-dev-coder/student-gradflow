import { Card, SimpleGrid } from '@mantine/core';

const TaskStatus = () => {
  return (
    <SimpleGrid mx="auto" cols={3} w="80%">
      <Card>To-do</Card>
      <Card>In progress</Card>
      <Card>Done</Card>
    </SimpleGrid>
  );
};

export default TaskStatus;
