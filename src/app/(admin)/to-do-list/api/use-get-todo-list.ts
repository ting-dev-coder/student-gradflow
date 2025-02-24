import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

interface useGetTodoListI {
  createdAt?: Date;
  range?: Date[];
}

export const useGetTodoList = ({ createdAt, range }: useGetTodoListI) => {
  const query = useQuery({
    queryKey: ['todo-list', createdAt?.toString(), range],
    queryFn: async () => {
      console.log('queyFn', range);
      const query = {
        createdAt: createdAt || undefined,
        range: range
          ? range.map((date) => dayjs(date).format('YYYY-MM-DD')).join(',')
          : undefined,
      };
      const res = await client.api['todo-list'].$get({
        query: query,
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
