"use client";

import React, { ReactNode } from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import "./globals.css";
import { HydrationBoundary, MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

const theme = createTheme({
	/** Your theme override here */
});
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
			console.log(`API Mutation Error ${mutationKey ? `: ${mutation}` : ""}`);
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
