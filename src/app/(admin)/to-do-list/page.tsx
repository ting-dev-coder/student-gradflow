'use client';

import { Button, Card, Group, Stack } from '@mantine/core';
import { useGetTodoList } from './api/use-get-todo-list';
import TimeLine from './components/timeline';
import DateCalendar from './components/weekly-calendar/page';
import ListTable from './components/list-table';
import { useDisclosure } from '@mantine/hooks';
import TaskStatus from './components/tasks-status';
import DrawerHandleTask from './components/drawer-handle-task';
import { useRef, useState } from 'react';
import { isTodayBefore } from '@/lib/utils';
import { useUpdateTodoList } from './api/use-update-todo-list';
import { useDeleteTodoList } from './api/use-delete-todo-list';
import { addDays, startOfDay } from 'date-fns';

const today = startOfDay(addDays(new Date(), 1));
const threeDaysLater = startOfDay(addDays(new Date(), 3));

const ToDoList = () => {
  const [detailOpened, { open: detailOpen, close: detailClose }] =
    useDisclosure(false);
  const selectedTaskIdRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    refetch,
    data: toDoList,
    error,
    isLoading,
    isFetching,
    isError,
  } = useGetTodoList({ createdAt: selectedDate });

  const { data: rangeData, isFetching: isFetchingRange } = useGetTodoList({
    range: [today, threeDaysLater],
  });

  const { mutate: updateMutate } = useUpdateTodoList();

  const { mutate: deleteMutate, isPending: deleteLoading } =
    useDeleteTodoList();

  if (isError) {
    // if (error.data?.code === "UNAUTHORIZED") {
    // 	console.log("unauthorize");
    // }
    return <div>Error: {error.message}</div>;
  }

  const handleDeleteClick = (taskId: string, callback) => {
    deleteMutate(
      { param: { taskId: taskId } },
      {
        onSettled: () => {
          callback();
        },
      }
    );
  };

  function handleEditClick(row) {
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

  function handleStatusChange(values, callback) {
    updateMutate(
      { form: { ...values }, param: { taskId: values.$id } },
      {
        onSuccess: ({ data }) => {
          callback();
        },
      }
    );
  }

  return (
    <Group h={'100dvh'} align="flex-start" wrap="nowrap" py="md" px="lg">
      <Stack flex={1} gap="sm" h="100%" style={{ overflow: 'auto' }}>
        <Card padding="sm">
          {!isTodayBefore(selectedDate.toISOString()) && (
            <Button
              style={{ zIndex: 1 }}
              w="fit-content"
              px="md"
              size="compact-md"
              color="var(--accent)"
              onClick={handleAddTaskClick}
              pos="absolute"
              right="var(--mantine-spacing-sm)"
              top="var(--mantine-spacing-sm)"
            >
              Add
            </Button>
          )}
          <DateCalendar
            defaultDate={selectedDate}
            onChange={handleDateChange}
          />
          <TaskStatus data={toDoList?.documents || []} loading={isFetching} />
        </Card>
        <Card flex={1}>
          <ListTable
            loading={isLoading}
            fetching={isFetching}
            deleteLoading={deleteLoading}
            data={toDoList?.documents}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onStatusChange={handleStatusChange}
          />
        </Card>
      </Stack>

      <DrawerHandleTask
        taskId={selectedTaskIdRef.current}
        defaultDate={selectedDate.toISOString()}
        opened={detailOpened}
        close={detailClose}
        refetch={refetch}
      />
      <Card h="100%" p="xs" flex={0.5} style={{ overflow: 'auto' }}>
        <TimeLine
          tasks={toDoList?.documents}
          upcomingTasks={rangeData?.documents}
          currentDate={selectedDate}
        />
      </Card>
    </Group>
  );
};

export default ToDoList;
