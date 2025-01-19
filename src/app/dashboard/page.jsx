"use client";

import { useRouter } from "next/router";

import { useReverseGeocodeQuery, useWeatherQuery } from "./hooks/use-weather";
import CurrentWeather from "./components/current-weather";

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
		<>
			<CurrentWeather data={weatherQuery.data} locationName={locationName} />
		</>
	);
};

export default Dashboard;
