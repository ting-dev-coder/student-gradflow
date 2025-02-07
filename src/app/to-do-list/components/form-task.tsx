import FormLabel from '@/components/form/form-label';
import ControllerInput from '@/components/form/input';
import TimePicker from '@/components/form/time-picker';
import { Button, Stack, Divider, Title, Checkbox, Group } from '@mantine/core';
import Textarea from '@/components/form/textarea';
import Select from '@/components/form/select';
import DateInput from '@/components/form/date-input';

const FormTask = ({ control, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <Stack px="lg">
          <Input label="Title" control={control} name="title" />
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
          <Checkbox control={control} name="allDay" label="All day " />

          <DateInput label="Start Date" name="startDate" control={control} />
          <Group wrap="nowrap">
            <FormLabel
              label={'Start Time'}
              field={<TimePicker control={control} name={'startTime'} />}
            />
            <FormLabel
              label={'End Time'}
              field={<TimePicker control={control} name={'endTime'} />}
            />
          </Group>

          <Divider />
          <Title order={5}>Description</Title>

          <Textarea name="description" control={control} autosize minRows={4} />
        </Stack>
        <Button
          mt="lg"
          w="calc(100% + var(--mantine-spacing-lg) * 2)"
          ml="calc(var(--mantine-spacing-lg) * -1)"
          type="submit"
          pos="sticky"
          bottom={0}
        >
          {control.taskId ? 'Edit Task' : 'Add Task'}
        </Button>
      </fieldset>
    </form>
  );
};

export default FormTask;
