import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

interface GetTodo {
  taskId?: number;
}

export const useGetTodo = ({ taskId }: GetTodo) => {
  const query = useQuery({
    queryKey: ['todo-list', taskId],
    queryFn: async () => {
      const res = await client.api['todo-list'][':taskId'].$get({
        param: { taskId: String(taskId) },
      });

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
