import { client } from '@/lib/rpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api)['todo-list'][':taskId']['$patch']
>;

type RequestType = InferRequestType<
  (typeof client.api)['todo-list'][':taskId']['$patch']
>;

export const useUpdateTodoList = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api['todo-list'][':taskId'].$patch({
        form,
        param,
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      return await response.json();
    },
    // onSuccess: () => {
    // 	// queryClient.invalidateQueries({ queryKey: ["todo-list"] });
    // },
    onError: () => {
      console.log('failed to update todo list');
    },
  });

  return mutation;
};
