import {
  Card,
  Text,
  SimpleGrid,
  Stack,
  Skeleton,
  Center,
  Box,
  Group,
} from '@mantine/core';

interface TaskStatus {
  data: {
    status: string;
  }[];
  loading: boolean;
}

function StatusCard({
  value,
  label,
  color,
}: {
  value: number | string;
  label: string;
  color: string;
}) {
  return (
    <Card shadow="md" p="sm">
      <Stack gap="0" align="center">
        <Text fz="2rem">{value}</Text>
        <Group gap="xs" wrap="nowrap">
          <Box style={{ borderRadius: '50%' }} w=".5rem" h=".5rem" bg={color} />
          <Text fz="sm" c="var(--gray2)" truncate="end">
            {label}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}

const TaskStatus = ({ data = [], loading }: TaskStatus) => {
  const done = data.filter((task) => task.status === 'done').length;

  const toDo = data.filter((task) => task.status === 'to-do').length;

  const inProgress = data.filter(
    (task) => task.status === 'in-progress'
  ).length;
  return (
    <SimpleGrid mt="sm" mx="auto" cols={3} w="80%">
      <Skeleton visible={loading}>
        <StatusCard color="var(--gray4)" value={toDo} label="To-do" />
      </Skeleton>

      <Skeleton visible={loading}>
        <StatusCard
          color="var(--primary)"
          value={inProgress}
          label="In progress"
        />
      </Skeleton>

      <Skeleton visible={loading}>
        <StatusCard color="var(--success)" value={done} label="Done" />
      </Skeleton>
    </SimpleGrid>
  );
};

export default TaskStatus;
