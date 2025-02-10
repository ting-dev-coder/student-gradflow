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

function ListTable({
  loading,
  data,
  onEditClick,
  onStatusChange,
  onDeleteClick,
}) {
  if (!data) return <>Data Empty</>;

  const [statuses, setStatuses] = useState(
    data.reduce((acc, task) => ({ ...acc, [task.name]: task.status }), {})
  );
  const tasks = data || [];
  const rows = data.map((element, idx) => {
    return (
      <Table.Tr key={`${element.name}-${idx}`}>
        <Table.Td>{element.title}</Table.Td>
        <Table.Td>{element?.category}</Table.Td>
        <Table.Td>
          {element.allDay
            ? 'All Day'
            : element.startTime
            ? `${element.startTime[0]}:${element.startTime[1]} ${element.startTime[2]}`
            : '-'}
        </Table.Td>
        <Table.Td maw="80px">
          {isTodayBefore(element.startDate) ? (
            element.status
          ) : (
            <Select
              value={statuses[element.name] || element.status}
              data={taskOpts}
              onChange={(status) => handleStatusChange(element, status)}
            />
          )}
        </Table.Td>
        <Table.Td>
          {isTodayBefore(element.startDate) ? (
            ''
          ) : (
            <ActionButtons
              onDeleteClick={(callback) => onDeleteClick(element.$id, callback)}
              onEditClick={onEditClick}
            />
          )}
        </Table.Td>
      </Table.Tr>
    );
  });

  function handleStatusChange(task, status) {
    setStatuses((prev) => ({ ...prev, [task.name]: status }));
    onStatusChange({ ...task, status });
  }

  return (
    <Table striped highlightOnHover pos={'relative'}>
      {/* <Progress
        w="100%"
        pos={'absolute'}
        value={100}
        animated
        h="2px"
        color="yellow"
      /> */}
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Task</Table.Th>
          <Table.Th>Category</Table.Th>
          <Table.Th>Start At</Table.Th>
          {/* <Table.Th>End At</Table.Th> */}
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {loading && <Loader size={30} />}
        {rows}
      </Table.Tbody>
    </Table>
  );
}

export default ListTable;
