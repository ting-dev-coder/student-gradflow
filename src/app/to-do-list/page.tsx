'use client';

import { Button, Collapse, Group, List, Stack, Title } from '@mantine/core';
import { useGetTodoList } from './api/use-get-todo-list';
import { useCreateTodoList } from './api/user-create-todo-list';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createTodoSchema } from './schemas';
import { z } from 'zod';
import { useUpdateTodoList } from './api/use-update-todo-list';
import { useDeleteTodoList } from './api/use-delete-todo-list';
import TimeLine from './components/timeline';
import DateCalendar from './components/weekly-calendar';
import ListTable from './components/list-table';
import { useDisclosure } from '@mantine/hooks';
import TaskDetail from './components/task-detail';
import TaskStatus from './components/tasks-status';

const ToDoList = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const {
    data: toDoList,
    error,
    isPending: isLoading,
    isError,
  } = useGetTodoList();

  console.log(toDoList);
  const { mutate: updateMutate } = useUpdateTodoList();
  const { mutate: deleteMutate } = useDeleteTodoList();

  if (isError) {
    // if (error.data?.code === "UNAUTHORIZED") {
    // 	console.log("權限問題");
    // }
    return <div>Error: {error.message}</div>;
  }

  const onUpdate = (taskId: string) => {
    updateMutate(
      { form: { name: '測試 to do 更新' }, param: { taskId: taskId } },
      {
        onSuccess: () => {
          console.log('成功');
        },
      }
    );
  };

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

  function handleRowClick() {
    toggle();
  }

  return (
    <Group h={'100vh'}>
      <Stack flex={1}>
        <Title tt="capitalize">to-do list</Title>
        <DateCalendar />
        <TaskStatus />
        <ListTable data={toDoList?.documents} onRowClick={handleRowClick} />
      </Stack>
      <Collapse h={opened ? '100%' : 0} in={opened}>
        <TimeLine />
        {/* <TaskDetail /> */}
      </Collapse>
    </Group>
  );
};

export default ToDoList;
