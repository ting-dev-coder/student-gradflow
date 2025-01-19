"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Divider, Input, Button, Text, Title } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/user-login";
import { getCurrent } from "../actions";
import ControllerInput from "@/components/form/input";

export default function SignIn() {
	const { mutate } = useLogin();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log("submit");
		mutate({ json: values });
	}
	return (
		<Card className="w-full h-full md:w-[487px] border-none shadow-none">
			<Title className="flex items-center justify-center text-center p-7">
				<Text className="text-2xl">Welcome back!</Text>
			</Title>
			<div className="px-7 mb-2">
				<Divider my="sm" variant="dotted" />
			</div>
			<Card.Section className="p-7">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<ControllerInput name="email" control={form.control} />

					<ControllerInput name="password" control={form.control} />
					<Button size="lg" type="submit">
						Login
					</Button>
				</form>
			</Card.Section>
			<div className="px-7">
				<Divider my="sm" variant="dotted" />
			</div>
			<Card.Section className="p-7 flex flex-col gap-y-4">
				<Button disabled={false} className="w-full" variant={"secondary"} size="lg">
					<FcGoogle className="mr-2 size-5" />
					Login with Google
				</Button>
				<Button disabled={false} className="w-full" variant={"secondary"} size="lg">
					<FaGithub className="mr-2 size-5" />
					Login with Github
				</Button>
			</Card.Section>
		</Card>
	);
}
