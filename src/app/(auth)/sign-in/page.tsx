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
  Center,
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
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

export default function SignIn() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = useLogin();

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
    <Card w="100%" pt="md" bg="transparent">
      <Button
        ml="auto"
        size="compact-md"
        color="var(--primary)"
        w="fit-content"
        variant="subtle"
        rightSection={<IconArrowRight size={14} />}
        onClick={navToSignup}
      >
        Sign in
      </Button>
      <Stack gap={0} justify="center" align="center">
        <Title pt="xl" c="#fff">
          Hi Student
        </Title>
        <Text pb="md" c="#fff">
          Welcome back!
        </Text>

        <form
          style={{ margin: 'auto', width: '80%' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack>
            <ControllerInput name="email" control={control} size="md" />

            <ControllerPasswordInput
              size="md"
              name="password"
              control={control}
            />
            {isError && <Text c="var(--error)">{error.message}</Text>}
            <Button
              px="xl"
              color="var(--secondary)"
              size="md"
              loading={isPending}
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}
