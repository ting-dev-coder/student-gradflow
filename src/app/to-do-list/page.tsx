"use client";

import { Button, Group, List } from "@mantine/core";
import { useGetTodoList } from "./api/use-get-todo-list";
import { useCreateTodoList } from "./api/user-create-todo-list";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTodoSchema } from "./schemas";
import { z } from "zod";
import { useUpdateTodoList } from "./api/use-update-todo-list";
import { useDeleteTodoList } from "./api/use-delete-todo-list";
import TimeLine from "./components/timeline";
import DateCalendar from "./components/date-calendar";
import ListTable from "./components/list-table";

const ToDoList = () => {
	const { data: toDoList, error, isPending: isLoading, isError } = useGetTodoList();

	const { mutate, isPending } = useCreateTodoList();
	const { mutate: updateMutate } = useUpdateTodoList();
	const { mutate: deleteMutate } = useDeleteTodoList();

	const form = useForm<z.infer<typeof createTodoSchema>>({
		resolver: zodResolver(createTodoSchema),
		defaultValues: {
			name: "",
		},
	});

	if (isError) {
		// if (error.data?.code === "UNAUTHORIZED") {
		// 	console.log("權限問題");
		// }
		return <div>Error: {error.message}</div>;
	}
	// values: z.infer<typeof createTodoSchema>
	const onSubmit = () => {
		mutate(
			{ form: { name: "測試 to do" } },
			{
				onSuccess: ({ data }) => {
					console.log("成功");
				},
			}
		);
	};

	const onUpdate = (taskId: string) => {
		updateMutate(
			{ form: { name: "測試 to do 更新" }, param: { taskId: taskId } },
			{
				onSuccess: () => {
					console.log("成功");
				},
			}
		);
	};

	const onDelete = (taskId: string) => {
		deleteMutate(
			{ param: { taskId: taskId } },
			{
				onSuccess: () => {
					console.log("成功");
				},
			}
		);
	};

	return (
		<>
			ToDoList....
			<Button onClick={onSubmit}>新增</Button>
			{toDoList?.documents.map((todo) => (
				<List>
					<List.Item>{todo.name}</List.Item>

					<Button onClick={() => onUpdate(todo.$id)}>更新</Button>
					<Button onClick={() => onDelete(todo.$id)}>刪除</Button>
				</List>
			))}
			<DateCalendar />
			<Group>
				<TimeLine />
				<ListTable />
			</Group>
		</>
	);
};

export default ToDoList;
