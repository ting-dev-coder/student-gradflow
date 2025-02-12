'use client';

import { Card, Box, Button, Divider, Title, Text, Stack } from '@mantine/core';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { registerSchema } from '../schemas';
import { useRegister } from '../api/user-register';
import ControllerInput from '@/components/form/input';
import ControllerPasswordInput from '@/components/form/password-input';
import { getCurrent } from '../actions';
import { redirect, useRouter } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';

export default async function SignUp() {
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
    mutate({ json: values });
  }
  function navToSignin() {
    router.push('/sign-in');
  }
  return (
    <Card>
      <Button
        mr="auto"
        w="fit-content"
        leftSection={<IconArrowLeft size={14} />}
        variant="subtle"
        onClick={navToSignin}
      >
        Sign up
      </Button>
      <Title ta="center">Sign up</Title>
      <Divider my="md" />
      <Card.Section className="p-7">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack>
            <ControllerInput label="Name" name="name" control={form.control} />
            <ControllerInput
              label="Email"
              name="email"
              control={form.control}
            />

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
            <Button px="xl" loading={isPending} size="compact-md" type="submit">
              Sign up
            </Button>
          </Stack>
        </form>
      </Card.Section>
    </Card>
  );
}
