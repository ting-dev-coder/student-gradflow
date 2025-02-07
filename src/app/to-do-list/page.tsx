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
import { useCreateTodoList } from './api/user-create-todo-list';
import { z } from 'zod';
import { useUpdateTodoList } from './api/use-update-todo-list';
import { useDeleteTodoList } from './api/use-delete-todo-list';
import TimeLine from './components/timeline';
import DateCalendar from './components/weekly-calendar/page';
import ListTable from './components/list-table';
import { useDisclosure } from '@mantine/hooks';
import TaskDetail from './components/task-detail';
import TaskStatus from './components/tasks-status';
import TransitionsSlide from '@/components/transitions-slide';
import DrawerAddTask from './components/drawer-handle-task';
import { useRef } from 'react';

const ToDoList = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [detailOpened, { open: detailOpen, close: detailClose }] =
    useDisclosure(false);
  const selectedTaskIdRef = useRef(null);

  const {
    data: toDoList,
    error,
    isFetching: isLoading,
    isError,
  } = useGetTodoList();

  if (isError) {
    // if (error.data?.code === "UNAUTHORIZED") {
    // 	console.log("權限問題");
    // }
    return <div>Error: {error.message}</div>;
  }

  const onDelete = (taskId: string) => {
    deleteMutate(
      { param: { taskId: taskId } },
      {
        onSuccess: () => {
          console.log('成功');
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

  function handleDateChange() {}

  return (
    <Group h={'100dvh'} align="flex-start" wrap="nowrap" py="md" px="lg">
      <Stack flex={1} gap="sm" h="100%" style={{ overflow: 'auto' }}>
        <Title tt="capitalize">to-do list</Title>
        <DateCalendar onChange={handleDateChange} />
        <TaskStatus data={toDoList?.documents} />
        <Button w="fit-content" onClick={handleAddTaskClick}>
          Add
        </Button>
        <ListTable
          loading={isLoading}
          data={toDoList?.documents}
          onRowClick={handleRowClick}
        />
      </Stack>

      <DrawerAddTask
        taskId={selectedTaskIdRef.current}
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
