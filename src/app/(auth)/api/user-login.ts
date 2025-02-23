import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

type ResponseType = InferResponseType<(typeof client.api.auth.login)['$post']>;

type RequestType = InferRequestType<(typeof client.api.auth.login)['$post']>;

export const useLogin = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      setError('');
      const response = await client.api.auth.login['$post']({ json });
      const result = await response.json();
      if (!response.ok || result.error) {
        const errorMessage = result.error || 'Failed to login';
        const error = new Error(errorMessage);
        error.name = 'LoginError';
        throw error;
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current'] });
      router.replace('/');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  return mutation;
};
