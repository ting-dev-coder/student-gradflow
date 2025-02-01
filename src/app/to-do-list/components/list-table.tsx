import { dateFormat } from '@/lib/utils';
import { Box, Table } from '@mantine/core';
import dayjs from 'dayjs';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function ListTable({ data, onRowClick }) {
  console.log('data', data);
  const tasks = data || [];
  const rows = tasks.map((element) => (
    <Table.Tr key={element.name} onClick={() => onRowClick(element)}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.category.cateoryName}</Table.Td>
      <Table.Td>{element.allDay ? '一整天' : '不'}</Table.Td>
      <Table.Td>{element.startAt ? dateFormat(element.startAt) : '-'}</Table.Td>
      <Table.Td>{element.endAt ? dateFormat(element.startAt) : '-'}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default ListTable;
