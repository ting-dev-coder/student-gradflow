import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api)['focus-mins']['$post']
>;

type RequestType = InferRequestType<(typeof client.api)['focus-mins']['$post']>;

export const useCreateFocusRecord = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api['focus-mins']['$post']({ form });

      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }
      return await response.json();
    },
    onError: () => {
      console.log('failed to create focus mins');
    },
  });

  return mutation;
};
