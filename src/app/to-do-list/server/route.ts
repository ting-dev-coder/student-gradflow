import { DATABASE_ID, TODO_LIST_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Query } from "node-appwrite";
import { createTodoSchema, updateTodoSchema } from "../schemas";

const app = new Hono()
	.get("/", sessionMiddleware, async (c) => {
		const databases = c.get("databases");
		const user = c.get("user");
		console.log("user", user);
		const toDoList = await databases.listDocuments(DATABASE_ID, TODO_LIST_ID, [Query.equal("userId", user.$id)]);

		if (toDoList?.total === 0) {
			return c.json({
				data: { documents: [], total: 0 },
			});
		}

		return c.json({ data: toDoList });
	})
	.post("/", zValidator("form", createTodoSchema), sessionMiddleware, async (c) => {
		const databases = c.get("databases");
		const user = c.get("user");
		const { name } = c.req.valid("form");

		const res = await databases.createDocument(DATABASE_ID, TODO_LIST_ID, "unique()", {
			name,
			userId: user.$id,
			// created_at: new Date().toISOString(),
		});
		return c.json({ data: res });
	})
	.patch(":taskId", sessionMiddleware, zValidator("form", updateTodoSchema), async (c) => {
		const databases = c.get("databases");
		const user = c.get("user");

		const { taskId } = c.req.param();
		const { name } = c.req.valid("form");

		// 先查詢該文檔是否存在，並檢查它是否屬於當前用戶
		const toDoList = await databases.getDocument(DATABASE_ID, TODO_LIST_ID, taskId);

		if (toDoList.userId !== user.$id) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		const res = await databases.updateDocument(DATABASE_ID, TODO_LIST_ID, taskId, {
			name,
		});
		return c.json({ data: res });
	})
	.delete(":taskId", sessionMiddleware, async (c) => {
		const databases = c.get("databases");
		const user = c.get("user");

		const { taskId } = c.req.param();

		// check if the data exit and check if it belongs to the current user
		const toDoList = await databases.getDocument(DATABASE_ID, TODO_LIST_ID, taskId);

		if (toDoList.userId !== user.$id) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		const res = await databases.deleteDocument(DATABASE_ID, TODO_LIST_ID, taskId);

		return c.json({ data: res });
	});

export default app;
