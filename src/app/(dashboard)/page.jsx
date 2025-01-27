"use client";
import { useReverseGeocodeQuery, useWeatherQuery } from "./hooks/use-weather";
import CurrentWeather from "./components/current-weather";
import { Grid, Stack } from "@mantine/core";

const Dashboard = () => {
	// const router = useRouter();
	// const { query } = router;

	const lat = 0; //parseFloat(query.get("lat") || "0");
	const lon = 0; //parseFloat(query.get("lon") || "0");
	const coordinates = { lat, lon };
	const weatherQuery = useWeatherQuery(coordinates);
	const locationQuery = useReverseGeocodeQuery(coordinates);

	const locationName = locationQuery.data?.[0];

	console.log("render");

	return (
		<Grid>
			<Grid.Col span={8}>
				<Stack bg="#fff"></Stack>
			</Grid.Col>
			<Grid.Col span={4}>
				<Stack bg="#fff">
					<CurrentWeather data={weatherQuery.data} locationName={locationName} />
				</Stack>
			</Grid.Col>
		</Grid>
	);
};

export default Dashboard;
