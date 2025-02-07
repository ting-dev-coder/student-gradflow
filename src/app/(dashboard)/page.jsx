'use client';
import { useReverseGeocodeQuery, useWeatherQuery } from './hooks/use-weather';
import CurrentWeather from './components/current-weather';
import { Box, Grid, Stack } from '@mantine/core';
import classes from './dashboard.module.scss';

const Dashboard = () => {
  // const router = useRouter();
  // const { query } = router;

  const lat = 0; //parseFloat(query.get("lat") || "0");
  const lon = 0; //parseFloat(query.get("lon") || "0");
  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const locationName = locationQuery.data?.[0];

  return (
    <Grid
      classNames={{
        inner: classes['inner'],
      }}
      h="calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-padding))"
    >
      <Grid.Col
        span={{
          base: 6,
          lg: 8,
        }}
        h="100%"
      >
        <Stack h="100%">
          <Box bg="#fff" flex={1.5}>
            上方
          </Box>
          <Box bg="#fff" flex={1}>
            下方{' '}
          </Box>
        </Stack>
      </Grid.Col>
      <Grid.Col
        span={{
          base: 6,
          lg: 4,
        }}
        h="100%"
      >
        <Stack h="100%">
          <Box bg="#fff" flex={1}>
            <CurrentWeather
              data={weatherQuery.data}
              locationName={locationName}
            />
          </Box>
          <Box bg="#fff" flex={3}></Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default Dashboard;
