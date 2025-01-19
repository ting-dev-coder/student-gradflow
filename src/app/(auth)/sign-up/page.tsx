import { redirect } from "next/navigation";

import { getCurrent } from "../actions";
import { SignUpCard } from "../components/sign-up-card";

export default async function SignUp() {
	const user = await getCurrent();
	// if (user) redirect("/");
	return <SignUpCard />;
}
