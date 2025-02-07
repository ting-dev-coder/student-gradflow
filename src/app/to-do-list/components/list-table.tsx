import { dateFormat } from '@/lib/utils';
import { Box, Loader, Table } from '@mantine/core';

function ListTable({ loading, data, onRowClick }) {
  if (!data) return <>Data Empty</>;

  const tasks = data || [];
  const rows = tasks.map((element, idx) => (
    <Table.Tr
      key={`${element.name}-${idx}`}
      onClick={() => onRowClick(element)}
    >
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element?.category?.cateoryName}</Table.Td>
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
      <Table.Td>{element.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
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
