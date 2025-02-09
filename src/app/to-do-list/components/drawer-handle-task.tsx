'use client';
import {
  Button,
  Divider,
  Drawer,
  Group,
  Input,
  List,
  LoadingOverlay,
  Stack,
  Title,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTodoSchema, editTodoSchema } from '../schemas';
import { useCreateTodoList } from '../api/user-create-todo-list';
import ControllerInput from '@/components/form/input';
import { DEFAULT_FORM_VALUES, useCreateTask } from '../hooks/use-create-task';
import Select from '@/components/form/select';
import DateInput from '@/components/form/date-input';
import Checkbox from '@/components/form/checkbox';
import TimePicker from '@/components/form/time-picker';
import FormLabel from '@/components/form/form-label';
import Textarea from '@/components/form/textarea';
import FormTask from './form-task';
import { useEffect, useState } from 'react';
import { useGetTodo } from '../api/use-get-todo';
import { notifications } from '@mantine/notifications';
import { useDeleteTodoList } from '../api/use-delete-todo-list';
import { useUpdateTodoList } from '../api/use-update-todo-list';
import { useEditTask } from '../hooks/use-edit-task';

interface DrawerHandleTaskProps {
  opened: boolean;
  taskId?: number | null;
  close: () => void;
}

const DrawerHandleTask = ({ opened, close, taskId }: DrawerHandleTaskProps) => {
  const { mutate, isPending } = useCreateTodoList();

  let useApiHook = useCreateTask;
  let onSubmit = onAddSubmit;
  if (!!taskId) {
    useApiHook = useEditTask;
    onSubmit = onEditSubmit;
  }

  const {
    resetForm,
    form: { getValues, control, handleSubmit, clearErrors, reset },
  } = useApiHook();

  const { mutate: updateMutate, isPending: editPending } = useUpdateTodoList();
  const { mutate: deleteMutate, isPending: deletePending } =
    useDeleteTodoList();

  const { data, isFetching: taskLoading } = useGetTodo(taskId);

  useEffect(() => {
    console.log(data);

    if (taskId && data) {
      reset((prev) => ({ ...prev, ...data }));
    }
  }, [data, reset]);
  function onAddSubmit(values: z.infer<typeof createTodoSchema>) {
    mutate(
      {
        form: { ...values },
      },
      {
        onSuccess: ({ data }) => handleSubmitSuccess(data),
      }
    );
  }

  function onEditSubmit(values: z.infer<typeof editTodoSchema>) {
    updateMutate(
      { form: { ...values }, param: { taskId } },
      {
        onSuccess: ({ data }) => handleSubmitSuccess(data),
      }
    );
  }

  function handleSubmitSuccess(data) {
    notifications.show({
      title: 'Successfully Added',
      message: data.title,
    });
    onClose();
  }
  function onClose() {
    resetForm();
    close();
  }
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={taskId ? 'Edit Task' : `Add task`}
      position="right"
      transitionProps={{
        transition: 'slide-left',
      }}
      padding="0"
      size="32rem"
    >
      <LoadingOverlay
        visible={taskLoading || isPending || deletePending || editPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <Stack px="lg">
            <ControllerInput label="Title" control={control} name="title" />
            <Select
              label="Category"
              name="category"
              control={control}
              data={[
                { value: 'study', label: 'Study' },
                { value: 'personal', label: 'Personal' },
                { value: 'work', label: 'Work' },
              ]}
            />
            <Select
              label="Status"
              name="status"
              control={control}
              data={[
                { value: 'to-do', label: 'To-do' },
                { value: 'in-progress', label: 'In progress' },
                { value: 'done', label: 'done' },
              ]}
            />
            <Divider />
            <Title order={5}>Dates</Title>

            <DateInput label="Start Date" name="startDate" control={control} />
            <Checkbox control={control} name="allDay" label="All day " />
            <Group wrap="nowrap">
              <FormLabel
                label={'Start Time'}
                field={
                  <TimePicker
                    initialHour={getValues('startTime')?.[0]}
                    initialMin={getValues('startTime')?.[1]}
                    initialSession={getValues('startTime')?.[2] as string}
                    control={control}
                    name={'startTime'}
                  />
                }
              />
              <FormLabel
                label={'End Time'}
                field={
                  <TimePicker
                    initialHour={getValues('endTime')?.[0]}
                    initialMin={getValues('endTime')?.[1]}
                    initialSession={getValues('endTime')?.[2] as string}
                    control={control}
                    name={'endTime'}
                  />
                }
              />
            </Group>

            <Divider />
            <Title order={5}>Description</Title>

            <Textarea
              name="description"
              control={control}
              autosize
              minRows={4}
            />
          </Stack>
          <Button
            mt="lg"
            w="calc(100% + var(--mantine-spacing-lg) * 2)"
            ml="calc(var(--mantine-spacing-lg) * -1)"
            type="submit"
            pos="sticky"
            bottom={0}
          >
            {taskId ? 'Edit Task' : 'Add Task'}
          </Button>
        </fieldset>
      </form>
    </Drawer>
  );
};

export default DrawerHandleTask;
