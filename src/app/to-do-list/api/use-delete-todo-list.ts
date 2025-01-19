import { client } from "@/lib/rpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof client.api)["todo-list"][":taskId"]["$delete"]>;

type RequestType = InferRequestType<(typeof client.api)["todo-list"][":taskId"]["$delete"]>;

export const useDeleteTodoList = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ param }) => {
			const response = await client.api["todo-list"][":taskId"].$delete({ param });

			if (!response.ok) {
				throw new Error("Failed to delete task");
			}
			return await response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todo-list"] });
		},
		onError: () => {
			console.log("failed to delete todo list");
		},
	});

	return mutation;
};
