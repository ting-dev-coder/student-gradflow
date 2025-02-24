import { dateFormat, isTodayBefore } from '@/lib/utils';
import {
  Box,
  Loader,
  Progress,
  Table,
  Select,
  ActionIcon,
  Group,
  Modal,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { format, isBefore, startOfDay } from 'date-fns';
import { useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';

const taskOpts = [
  {
    label: 'To-do',
    value: 'to-do',
  },
  {
    label: 'In-progress',
    value: 'in-progress',
  },
  {
    label: 'Done',
    value: 'done',
  },
];

function ActionButtons({ deleteLoading, onEditClick, onDeleteClick }) {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Group gap={'xxs'}>
      <ActionIcon onClick={onEditClick}>
        <BiSolidEdit />
      </ActionIcon>
      <ActionIcon onClick={open} color="var(--gray4)">
        <MdDeleteForever />
      </ActionIcon>

      <Modal
        size="auto"
        title="Are you sure you want to delete this task?"
        opened={opened}
        onClose={close}
        centered
      >
        This action cannot be undone.
        <Group mt="lg" justify="flex-end">
          <Button onClick={close} variant="default">
            Cancel
          </Button>
          <Button
            onClick={() => onDeleteClick(() => close())}
            color="var(--gray4)"
            loading={deleteLoading}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </Group>
  );
}

function TaskRow({
  deleteLoading,
  task,
  onStatusChange,
  onEditClick,
  onDeleteClick,
}) {
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  function handleChange(newStatus) {
    setLoading(true);
    setStatus(newStatus);
    onStatusChange({ ...task, status: newStatus }, () => setLoading(false));
  }

  return (
    <Table.Tr key={task.name}>
      <Table.Td>{task.title}</Table.Td>
      <Table.Td>{task?.category}</Table.Td>
      <Table.Td>
        {task.allDay
          ? 'All Day'
          : task.startTime
          ? `${task.startTime[0]}:${task.startTime[1]} ${task.startTime[2]}`
          : '-'}
      </Table.Td>
      <Table.Td maw="100px">
        {isTodayBefore(task.startDate) ? (
          task.status
        ) : (
          <Select
            value={status}
            data={taskOpts}
            onChange={handleChange}
            disabled={loading}
            rightSection={
              loading && <ActionIcon variant="subtle" loading={loading} />
            }
          />
        )}
      </Table.Td>
      <Table.Td>
        {isTodayBefore(task.startDate) ? (
          ''
        ) : (
          <ActionButtons
            deleteLoading={deleteLoading}
            onDeleteClick={(callback) => onDeleteClick(task.$id, callback)}
            onEditClick={() => onEditClick(task)}
          />
        )}
      </Table.Td>
    </Table.Tr>
  );
}

function ListTable({
  fetching,
  loading,
  deleteLoading,
  data,
  onEditClick,
  onStatusChange,
  onDeleteClick,
}) {
  return (
    <Table striped highlightOnHover pos={'relative'}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Task</Table.Th>
          <Table.Th>Category</Table.Th>
          <Table.Th>Start At</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody pos="relative" mih="200px">
        {/* Show Loader only during the initial loading */}
        {loading && (
          <Table.Tr>
            <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
              <Loader size={30} />
            </Table.Td>
          </Table.Tr>
        )}

        {/* Show Progress bar while fetching new data, but hide previous data */}
        {fetching && !loading && (
          <Table.Tr>
            <Table.Td
              colSpan={4}
              style={{ position: 'relative', textAlign: 'center' }}
            >
              <Progress
                w="100%"
                h="3px"
                top={0}
                pos="absolute"
                value={100}
                animated
              />
            </Table.Td>
          </Table.Tr>
        )}

        {/* Show "No data available" message only when no data exists and not in loading/fetching states */}
        {!loading && !fetching && (!data || data.length === 0) && (
          <Table.Tr>
            <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
              No data available
            </Table.Td>
          </Table.Tr>
        )}

        {/* Render data rows only when not loading or fetching */}
        {!loading &&
          !fetching &&
          data?.map((task, idx) => (
            <TaskRow
              key={`${idx}-${task.name}`}
              task={task}
              deleteLoading={deleteLoading}
              onStatusChange={onStatusChange}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
      </Table.Tbody>
    </Table>
  );
}

export default ListTable;
