import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

export const useGetTodoList = (createdAt) => {
  const query = useQuery({
    queryKey: ['todo-list', createdAt?.toString()],
    queryFn: async () => {
      const res = await client.api['todo-list'].$get({
        query: createdAt ? { createdAt } : undefined,
      });

      if (!res.ok) {
        throw new Error('failed to get to-do list');
      }

      const { data } = await res.json();

      return data;
    },
    retry: false,
  });

  return query;
};
