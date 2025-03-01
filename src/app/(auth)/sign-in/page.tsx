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

export default function SignIn() {
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

  return (
    <Card w="100%" pt="md" bg="transparent">
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
            <ControllerInput
              label="Email"
              name="email"
              control={control}
              size="md"
            />

            <ControllerPasswordInput
              label="Password"
              size="md"
              name="password"
              control={control}
            />
            {isError && <Text c="var(--error)">{error.message}</Text>}
            <Button
              px="xl"
              color="var(--primary)"
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
