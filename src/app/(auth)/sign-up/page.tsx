'use client';

import { Card, Button, Title, Stack } from '@mantine/core';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../schemas';
import { useRegister } from '../api/user-register';
import ControllerInput from '@/components/form/input';
import ControllerPasswordInput from '@/components/form/password-input';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const { mutate, isPending } = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    mutate(
      { json: values },
      {
        onSuccess: () => navToSignin(),
      }
    );
  }
  function navToSignin() {
    router.push('/sign-in');
  }
  return (
    <Card w="100%" bg="transparent">
      <Title mb="50" ta="center" c="var(--primary)">
        Sign up
      </Title>
      <form
        style={{ margin: 'auto', width: '80%' }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Stack>
          <ControllerInput label="Name" name="name" control={form.control} />
          <ControllerInput label="Email" name="email" control={form.control} />

          <ControllerPasswordInput
            label="Password"
            name="password"
            control={form.control}
          />
          <ControllerPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            control={form.control}
          />
          <Button
            px="xl"
            color="var(--accent)"
            size="md"
            loading={isPending}
            type="submit"
          >
            Sign up
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
