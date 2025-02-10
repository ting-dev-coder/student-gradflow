import { dateFormat, isTodayBefore } from '@/lib/utils';
import {
  Box,
  Loader,
  Progress,
  Table,
  Select,
  ActionIcon,
} from '@mantine/core';
import { format, isBefore, startOfDay } from 'date-fns';
import { useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';

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

function ListTable({ loading, data, onRowClick, onStatusChange }) {
  if (!data) return <>Data Empty</>;

  const tasks = data || [];
  const rows = tasks.map((element, idx) => {
    const [status, setStatus] = useState(element.status);
    function handleRowClick(element) {
      onRowClick(element);
    }

    function handleStatusChange(status) {
      setStatus(status);
      console.log({ ...element, status });
      onStatusChange({ ...element, status });
    }

    return (
      <Table.Tr key={`${element.name}-${idx}`}>
        <Table.Td>{element.title}</Table.Td>
        <Table.Td>{element?.category}</Table.Td>
        <Table.Td>
          {element.allDay
            ? 'All Day'
            : element.startAt
            ? dateFormat(element.startAt)
            : '-'}
        </Table.Td>
        <Table.Td>
          {element.allDay
            ? '-'
            : element.endAt
            ? dateFormat(element.startAt)
            : '-'}
        </Table.Td>
        <Table.Td maw="100px">
          {isTodayBefore(element.startDate) ? (
            element.status
          ) : (
            <Select
              value={status}
              data={taskOpts}
              onChange={handleStatusChange}
            />
          )}
        </Table.Td>
        <Table.Td>
          {isTodayBefore(element.startDate) ? (
            ''
          ) : (
            <ActionIcon onClick={() => handleRowClick(element)}>
              <BiSolidEdit />
            </ActionIcon>
          )}
        </Table.Td>
      </Table.Tr>
    );
  });

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
          <Table.Th>End At</Table.Th>
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
