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

export default function SignIn() {
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
  return (
    <Card>
      <Title>
        <Text>Welcome back!</Text>
      </Title>
      <div>
        <Divider my="sm" variant="dotted" />
      </div>
      <Stack ta="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <ControllerInput label="Email" name="email" control={control} />

            <ControllerInput
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
      <div className="px-7">
        <Divider my="sm" variant="dotted" />
      </div>
    </Card>
  );
}
