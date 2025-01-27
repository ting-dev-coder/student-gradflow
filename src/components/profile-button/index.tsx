import { MdOutlineChevronRight } from "react-icons/md";

import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import classes from "./ProfileButton.module.css";

export function ProfileButton() {
	return (
		<UnstyledButton w="100%" className={classes.profile}>
			<Group>
				<Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" radius="xl" />

				<div style={{ flex: 1 }}>
					<Text size="sm" fw={500}>
						Harriette Spoonlicker
					</Text>

					<Text c="dimmed" size="xs">
						hspoonlicker@outlook.com
					</Text>
				</div>

				<MdOutlineChevronRight size={14} />
			</Group>
		</UnstyledButton>
	);
}
