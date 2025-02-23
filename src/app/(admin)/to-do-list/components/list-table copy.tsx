import { dateFormat } from '@/lib/utils';
import { Box, Loader, Select, Table, useStyles } from '@mantine/core';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { useMemo } from 'react';

type Task = {
  title: string;
  category: string;
  allDay: boolean;
  endAt: string;
  startAt: string;
  startDate: string;
};

function GroupMultiSelect(props) {
  const { value, handleOnChange, handleBlur } = useEdit(props);

  return (
    <Select
      label="Your favorite library"
      value={value}
      placeholder="Pick value"
      data={taskOpts}
    />
  );
}

const taskOpts = ['to-do', 'in-progress', 'done'];
// const taskOpts = [
//   {
//     label: 'To-do',
//     value: 'to-do',
//   },
//   {
//     label: 'In-progress',
//     value: 'in-progress',
//   },
//   {
//     label: 'Done',
//     value: 'done',
//   },
// ];

function ListTable({ fetching, loading, data, onRowClick }) {
  if (!data) return <>Data Empty</>;
  const columns = useMemo<MRT_ColumnDef<Task>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Task',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'startAt',
        header: 'Start At',
        accessorFn: (row) =>
          row.allDay ? 'All Day' : row.startAt ? dateFormat(row.startAt) : '-',
      },
      {
        accessorKey: 'endAt',
        header: 'End At',
        accessorFn: (row) =>
          row.allDay ? '-' : row.endAt ? dateFormat(row.startAt) : '-',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Edit: (props) => {
          return <GroupMultiSelect {...props} />;
        },
      },
    ],
    []
  );
  const table = useMantineReactTable({
    defaultColumn: {
      minSize: 20, //allow columns to get smaller than default
      maxSize: 9001, //allow columns to get larger than default
      size: 100,
    },
    columns,
    data,
    state: {
      showProgressBars: fetching,
      isLoading: loading,
    },
    enableSorting: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableEditing: true,
    editDisplayMode: 'table',
    // enableColumnActions: false,
    mantineTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row.original),
      sx: {
        cursor: 'pointer',
      },
    }),
  });
  const tasks = data || [];
  // const rows = tasks.map((element, idx) => {
  //   console.log(element);
  //   return (
  //     <Table.Tr
  //       key={`${element.name}-${idx}`}
  //       onClick={() => onRowClick(element)}
  //     >
  //       <Table.Td>{element.title}</Table.Td>
  //       <Table.Td>{element.title}</Table.Td>
  //       <Table.Td>{element?.category}</Table.Td>
  //       <Table.Td>
  //         {element.allDay
  //           ? 'All Day'
  //           : element.startAt
  //           ? dateFormat(element.startAt)
  //           : '-'}
  //       </Table.Td>
  //       <Table.Td>
  //         {element.allDay
  //           ? '-'
  //           : element.endAt
  //           ? dateFormat(element.startAt)
  //           : '-'}
  //       </Table.Td>
  //       <Table.Td>{element.status}</Table.Td>
  //     </Table.Tr>
  //   );
  // });

  const handleRowClick = (rowData: Task) => {
    console.log('Row clicked:', rowData);
    //onRowClick(rowData);
  };
  return (
    <MantineReactTable table={table} />
    // <Table>
    //   <Table.Thead>
    //     <Table.Tr>
    //       <Table.Th>Task</Table.Th>
    //       <Table.Th>Category</Table.Th>
    //       <Table.Th>Start At</Table.Th>
    //       <Table.Th>End At</Table.Th>
    //       <Table.Th>Status</Table.Th>
    //     </Table.Tr>
    //   </Table.Thead>
    //   <Table.Tbody>
    //     {loading && <Loader size={30} />}
    //     {rows}
    //   </Table.Tbody>
    // </Table>
  );
}

export default ListTable;

import {
  MRT_Cell,
  MRT_Column,
  MRT_Row,
  MRT_TableInstance,
} from 'mantine-react-table';
import { useState } from 'react';

export type MantineTableCellProps<TData extends Record<string, any>> = {
  cell: MRT_Cell<TData>;
  column: MRT_Column<TData>;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
};

export function useEdit<TData extends Record<string, any>>(
  props: MantineTableCellProps<TData>
) {
  const { cell, column, row, table } = props;
  const { getState, setEditingCell, setEditingRow, setCreatingRow } = table;
  const { editingRow, creatingRow } = getState();

  const [value, setValue] = useState(() => cell.getValue());
  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;

  const handleOnChange = (newValue: unknown) => {
    //@ts-ignore
    row._valuesCache[column.id] = newValue;
    if (isCreating) setCreatingRow(row);
    else if (isEditing) setEditingRow(row);
    setValue(newValue);
  };

  const handleBlur = () => {
    setEditingCell(null);
  };

  return { value, handleOnChange, handleBlur };
}
