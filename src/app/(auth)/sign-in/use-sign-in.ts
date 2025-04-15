import { useForm } from 'react-hook-form';
import { loginSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const useSignIn = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo@northislandcollege.ca',
      password: 'demo12345',
    },
  });
  return {
    form,
  };
};
