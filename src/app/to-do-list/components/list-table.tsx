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

function ActionButtons({ onEditClick, onDeleteClick }) {
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
        title="Delete this page?"
        opened={opened}
        onClose={close}
        centered
      >
        Are you sure you want to delete this task? This action cannot be undone.
        <Group mt="lg" justify="flex-end">
          <Button onClick={close} variant="default">
            Cancel
          </Button>
          <Button
            onClick={() => onDeleteClick(() => close())}
            color="var(--gray4)"
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </Group>
  );
}

function TaskRow({ task, onStatusChange, onEditClick, onDeleteClick }) {
  const [status, setStatus] = useState(task.status);

  function handleChange(newStatus) {
    setStatus(newStatus);
    onStatusChange({ ...task, status: newStatus });
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
      <Table.Td maw="80px">
        {isTodayBefore(task.startDate) ? (
          task.status
        ) : (
          <Select value={status} data={taskOpts} onChange={handleChange} />
        )}
      </Table.Td>
      <Table.Td>
        {isTodayBefore(task.startDate) ? (
          ''
        ) : (
          <ActionButtons
            onDeleteClick={(callback) => onDeleteClick(task.$id, callback)}
            onEditClick={() => onEditClick(task)}
          />
        )}
      </Table.Td>
    </Table.Tr>
  );
}

function ListTable({
  loading,
  data,
  onEditClick,
  onStatusChange,
  onDeleteClick,
}) {
  if (!data) return <>Data Empty</>;

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
      <Table.Tbody>
        {loading && <Loader size={30} />}
        {data.map((task) => (
          <TaskRow
            key={task.name}
            task={task}
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
