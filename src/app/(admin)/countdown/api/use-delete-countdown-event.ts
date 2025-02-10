import { client } from "@/lib/rpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof client.api)["countdown"][":countdownId"]["$delete"]>;

type RequestType = InferRequestType<(typeof client.api)["countdown"][":countdownId"]["$delete"]>;

export const useDeleteCountdownEvent = () => {
	const queryClient = useQueryClient();
	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ param }) => {
			const response = await client.api["countdown"][":countdownId"].$delete({ param });

			if (!response.ok) {
				throw new Error("Failed to delete event");
			}
			return await response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["countdown"] });
		},
		onError: () => {
			console.log("failed to delete countdown list");
		},
	});

	return mutation;
};
