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
        {/* <Table.Td>
          {element.allDay
            ? '-'
            : element.endTime
            ? dateFormat(element.endTime)
            : '-'}
        </Table.Td> */}
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
            <ActionIcon onClick={() => onRowClick(element)}>
              <BiSolidEdit />
            </ActionIcon>
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
