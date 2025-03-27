import { useQuery, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';

export const useGetFocusRecords = (date?: Date) => {
  const queryClient = useQueryClient();
  const mutation = useQuery({
    queryKey: ['focus-min', date],
    queryFn: async ({ form }) => {
      const response = await client.api['focus-mins']['$get']({
        form,
        query: { date },
      });

      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }
      return await response.json();
    },
  });

  return mutation;
};
