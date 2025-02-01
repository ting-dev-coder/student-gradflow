import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetCountdownEvents = () => {
	const query = useQuery({
		queryKey: ["countdown"],
		queryFn: async () => {
			const res = await client.api["countdown"].$get();

			if (!res.ok) {
				throw new Error("failed to get countdown events");
			}

			const { data } = await res.json();

			return data;
		},
		retry: false,
	});

	return query;
};
