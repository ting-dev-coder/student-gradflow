'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  Divider,
  Input,
  Button,
  Text,
  Title,
  Stack,
} from '@mantine/core';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Form, useForm } from 'react-hook-form';
import { loginSchema } from '../schemas';
import { useLogin } from '../api/user-login';
import { getCurrent } from '../actions';
import ControllerInput from '@/components/form/input';
import { useSignIn } from './use-sign-in';
import ControllerPasswordInput from '@/components/form/password-input';
import { useRouter } from 'next/navigation';
import { IconArrowRight } from '@tabler/icons-react';

export default function SignIn() {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const {
    form: {
      control,
      handleSubmit,
      clearErrors,
      formState: { errors, isSubmitted, isDirty },
    },
  } = useSignIn();

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(
      { json: values },
      {
        onSuccess: () => {},
      }
    );
  }
  function navToSignup() {
    router.push('/sign-up');
  }
  return (
    <Card w="100%" pt="0">
      <Button
        ml="auto"
        w="fit-content"
        rightSection={<IconArrowRight size={14} />}
        variant="subtle"
        onClick={navToSignup}
      >
        Sign up
      </Button>
      <Title>Sign in</Title>
      <Text>Welcome back!</Text>
      <Divider my="sm" variant="dotted" />
      <Stack ta="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <ControllerInput label="Email" name="email" control={control} />

            <ControllerPasswordInput
              label="Password"
              name="password"
              control={control}
            />
            <Button px="xl" size="compact-md" loading={isPending} type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}
