"use client";

import { Card, Box, Button, Divider, Title, Text } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/user-register";
import ControllerInput from "@/components/form/input";

export function SignUpCard() {
	const { mutate } = useRegister();

	const form = useForm<z.infer<typeof registerSchema>>({
		mode: "onSubmit",
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof registerSchema>) {
		console.log("onSubmit");
		mutate({ json: values });
	}
	return (
		<Card className="w-full h-full md:w-[487px] border-none shadow-none">
			<Title className="flex items-center justify-center text-center p-7">
				<Text className="text-2xl">Sign Up</Text>
				<Card.Section>
					By signing up, you agree to our{" "}
					<Link href="/privacy">
						<span className="text-blue-700">Privacy Policy</span>
					</Link>{" "}
					and{" "}
					<Link href="/terms">
						<span className="text-blue-700">Terms of Service</span>
					</Link>
				</Card.Section>
			</Title>
			<div className="px-7 mb-2">
				<Divider variant="dashed" />
			</div>
			<Card.Section className="p-7">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<ControllerInput name="name" control={form.control} />
					<ControllerInput name="email" control={form.control} />

					<ControllerInput name="password" control={form.control} />
					<Button size="lg" type="submit">
						Sign up
					</Button>
				</form>
			</Card.Section>
			<Box px="xl">
				<Divider variant="dashed" />
			</Box>
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
