import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetTodoList = () => {
	const query = useQuery({
		queryKey: ["todo-list"],
		queryFn: async () => {
			const res = await client.api["todo-list"].$get();

			if (!res.ok) {
				throw new Error("failed to get to-do list");
			}

			const { data } = await res.json();

			return data;
		},
		retry: false,
	});

	return query;
};
