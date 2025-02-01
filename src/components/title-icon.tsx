import { Text, Group, Paper, Title } from "@mantine/core";
import { IconType } from "react-icons";

interface TitleIcon {
	icon: IconType;
	title: string;
}
const TitleIcon = ({ icon: Icon, title }: TitleIcon) => {
	return (
		<Group gap="xs">
			<Paper
				p="xs"
				style={{
					color: "var(--secondary)",
				}}
				bg="var(--gray5)"
				radius={"100vmax"}
			>
				<Icon />
			</Paper>
			{title && <Title order={3}>{title}</Title>}
		</Group>
	);
};

export default TitleIcon;
