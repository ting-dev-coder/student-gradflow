import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api)["todo-list"]["$post"]>;

type RequestType = InferRequestType<(typeof client.api)["todo-list"]["$post"]>;

export const useCreateTodoList = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ form }) => {
			const response = await client.api["todo-list"]["$post"]({ form });

			if (!response.ok) {
				throw new Error("Failed to create workspace");
			}
			return await response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todo-list"] });
		},
		onError: () => {
			console.log("failed to create todo list");
		},
	});

	return mutation;
};
