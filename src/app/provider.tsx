'use client';

import React, { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import './globals.css';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import theme from './theme';

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log(`${error.message}`); // cache-level queries error hand
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _, __, mutation) => {
      const { mutationKey } = mutation.options;
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Provider({ children }: Props) {
  // const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        {children}
      </MantineProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
