import { useForm } from 'react-hook-form';
import { createTodoSchema, editTodoSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const DEFAULT_FORM_VALUES = {
  title: '',
  category: 'personal',
  startDate: '',
  startTime: [0, 0, 'AM'],
  description: '',
  allDay: false,
  status: 'to-do',
};

export const useEditTask = () => {
  const form = useForm<z.infer<typeof editTodoSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(createTodoSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const resetForm = (values = DEFAULT_FORM_VALUES) => {
    form.reset(values, {
      keepDirty: false,
      keepTouched: false,
      keepValues: false,
    });
  };

  return {
    form,
    resetForm,
  };
};
