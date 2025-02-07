import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

import { InferRequestType, InferResponseType } from 'hono';

type ResponseType = InferResponseType<
  (typeof client.api)['todo-list'][':taskId']['$get']
>;

type RequestType = InferRequestType<
  (typeof client.api)['todo-list'][':taskId']['$get']
>;

export const useGetTodo = (taskId: number | null) => {
  const query = useQuery<ResponseType, Error, RequestType>({
    queryKey: ['todo-list', taskId],
    queryFn: async () => {
      console.log({ taskId });
      if (!taskId) return null;
      const res = await client.api['todo-list'][taskId].$get();

      if (!res.ok) {
        throw new Error('failed to get to-do list');
      }

      const { data } = await res.json();

      return data;
    },
    retry: false,
    enabled: !!taskId,
  });

  return query;
};
