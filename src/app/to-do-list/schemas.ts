import { z } from "zod";

export const createTodoSchema = z.object({
	name: z.string().trim().min(1, "required field"),
});

export const updateTodoSchema = z.object({
	name: z.string().trim().min(1, "required field"),
});
