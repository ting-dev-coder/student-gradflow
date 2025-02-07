import { Card, SimpleGrid } from '@mantine/core';

const TaskStatus = ({ data = [] }) => {
  const done = data.filter((task) => task.status === 'done').length;

  const toDo = data.filter((task) => task.status === 'to-do').length;

  const inProgress = data.filter(
    (task) => task.status === 'in-progress'
  ).length;
  return (
    <SimpleGrid mx="auto" cols={3} w="80%">
      <Card>To-do {toDo}</Card>
      <Card>In progress {inProgress}</Card>
      <Card>Done {done}</Card>
    </SimpleGrid>
  );
};

export default TaskStatus;
