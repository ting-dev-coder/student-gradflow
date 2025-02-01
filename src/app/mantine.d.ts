import "@mantine/core";

declare module "@mantine/core" {
	export interface MantineThemeSpacing {
		xxs: string;
		"2xl": string;
		"3xl": string;
		"4xl": string;
		"5xl": string;
	}

	export interface MantineTheme {
		spacing: MantineThemeSpacing;
	}
}
