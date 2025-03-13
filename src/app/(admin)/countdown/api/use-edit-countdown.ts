import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';

type ResponseType = InferResponseType<
  (typeof client.api)['countdown'][':countdownId']['$patch']
>;

type RequestType = InferRequestType<
  (typeof client.api)['countdown'][':countdownId']['$patch']
>;

export const useEditCountdown = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api['countdown'][':countdownId'].$patch(
        data
      );
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      return await response.json();
    },
    onSuccess: (_, variables) => {
      //if (variables.form.endAt) return;
      queryClient.invalidateQueries({ queryKey: ['countdown'] });
    },
    onError: () => {
      console.log('Failed to update todo list');
    },
  });

  return mutation;
};
