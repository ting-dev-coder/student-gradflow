import { useForm } from 'react-hook-form';
import { createCountdownSchema, updateCountdownSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const useUpdateCountdown = () => {
  const form = useForm<z.infer<typeof updateCountdownSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(updateCountdownSchema),
    defaultValues: {
      isMain: false,
    },
  });
  return {
    form,
  };
};
