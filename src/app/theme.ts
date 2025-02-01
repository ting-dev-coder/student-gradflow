import { createTheme } from "@mantine/core";

const theme = createTheme({
	autoContrast: true,
	luminanceThreshold: 0.3,
	spacing: {
		xxs: ".25rem",
		xs: ".5rem",
		sm: "1rem",
		md: "1.5rem",
		lg: "2rem",
		xl: "2.5rem",
		xxl: "3.5rem",
		"2xl": "4.5m",
		"3xl": "5rem",
		"4xl": "6rem",
		"5xl": "7rem",
	},
});

export default theme;
