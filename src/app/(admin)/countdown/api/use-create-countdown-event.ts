import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api)['countdown']['$post']
>;

type RequestType = InferRequestType<(typeof client.api)['countdown']['$post']>;

export const useCreateCountdownEvent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api['countdown']['$post']({ form });

      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countdown'] });
    },
    onError: () => {
      console.log('failed to create countdown event');
    },
  });

  return mutation;
};
