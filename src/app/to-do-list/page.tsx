'use client';

import {
  Button,
  Collapse,
  Drawer,
  Group,
  List,
  Stack,
  Title,
} from '@mantine/core';
import { useGetTodoList } from './api/use-get-todo-list';
import TimeLine from './components/timeline';
import DateCalendar from './components/weekly-calendar/page';
import ListTable from './components/list-table';
import { useDisclosure } from '@mantine/hooks';
import TaskDetail from './components/task-detail';
import TaskStatus from './components/tasks-status';
import DrawerAddTask from './components/drawer-handle-task';
import { useRef, useState } from 'react';
import { isTodayBefore } from '@/lib/utils';
import { useUpdateTodoList } from './api/use-update-todo-list';
import { notifications } from '@mantine/notifications';

const ToDoList = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [detailOpened, { open: detailOpen, close: detailClose }] =
    useDisclosure(false);
  const selectedTaskIdRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log('index date', selectedDate);
  const {
    data: toDoList,
    error,
    isLoading,
    isFetching,
    isError,
  } = useGetTodoList(selectedDate);
  const { mutate: updateMutate, isPending: editPending } = useUpdateTodoList();

  if (isError) {
    // if (error.data?.code === "UNAUTHORIZED") {
    // 	console.log("unauthorize");
    // }
    return <div>Error: {error.message}</div>;
  }

  const onDelete = (taskId: string) => {
    deleteMutate(
      { param: { taskId: taskId } },
      {
        onSuccess: () => {
          console.log('deleted');
        },
      }
    );
  };

  function handleRowClick(row) {
    selectedTaskIdRef.current = row.$id;
    detailOpen();
  }

  function handleAddTaskClick() {
    selectedTaskIdRef.current = null;
    detailOpen();
  }

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  function handleStatusChange(values) {
    updateMutate(
      { form: { ...values }, param: { taskId: values.$id } },
      {
        onSuccess: ({ data }) => {
          notifications.show({
            message: 'Successfully updated',
          });
        },
      }
    );
  }

  return (
    <Group h={'100dvh'} align="flex-start" wrap="nowrap" py="md" px="lg">
      <Stack flex={1} gap="sm" h="100%" style={{ overflow: 'auto' }}>
        <Title tt="capitalize">to-do list</Title>
        <DateCalendar defaultDate={selectedDate} onChange={handleDateChange} />
        <TaskStatus data={toDoList?.documents || []} />
        {!isTodayBefore(selectedDate.toISOString()) && (
          <Button w="fit-content" onClick={handleAddTaskClick}>
            Add
          </Button>
        )}

        <ListTable
          loading={isLoading || isFetching}
          data={toDoList?.documents}
          onRowClick={handleRowClick}
          onStatusChange={handleStatusChange}
        />
      </Stack>

      <DrawerAddTask
        taskId={selectedTaskIdRef.current}
        defaultDate={selectedDate.toISOString()}
        opened={detailOpened}
        close={detailClose}
      />
      <TimeLine />
      {/* <TransitionsSlide opened={opened}>
        <TimeLine />
      </TransitionsSlide> */}
    </Group>
  );
};

export default ToDoList;
