'use client';
import { useReverseGeocodeQuery, useWeatherQuery } from './hooks/use-weather';
import CurrentWeather from './components/current-weather';
import { Box, Grid, Group, Stack, Text } from '@mantine/core';
import classes from './dashboard.module.scss';
import { useGetCountdownEvents } from '../countdown/api/use-get-countdown-events';
import MainCountdown from './components/main-countdown';
import TimeLine from '../to-do-list/components/timeline';
import { useGetTodoList } from '../to-do-list/api/use-get-todo-list';
import WeeklyFocusChart from './components/weekly-focus-chart';
import { useGeolocation } from './hooks/use-geolocation';

const Dashboard = () => {
  // const router = useRouter();
  // const { query } = router;
  const {
    data: countdownEvents,
    error,
    isFetching: isLoading,
  } = useGetCountdownEvents();

  const mainEvent =
    (countdownEvents?.documents || []).find((event) => event.isMain) ||
    countdownEvents?.documents[0] ||
    [];
  const {
    data: toDoList,
    isLoading: toDoLoading,
    isFetching,
    isError,
  } = useGetTodoList(new Date());
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const locationName = locationQuery.data?.[0];

  return (
    <Grid
      py="md"
      px="lg"
      classNames={{
        inner: classes['inner'],
      }}
      h="calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-padding))"
    >
      <Grid.Col
        pt={0}
        pl={0}
        pb={0}
        pr="xl"
        span={{
          base: 6,
          lg: 8,
        }}
        h="100%"
      >
        <Stack h="100%">
          <Box bg="#fff" flex={1.5}>
            <MainCountdown event={mainEvent} />
          </Box>
          <Box bg="#fff" flex={1} mih="250px">
            <WeeklyFocusChart />
          </Box>
        </Stack>
      </Grid.Col>
      <Grid.Col
        p={0}
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
          <Box bg="#fff" flex={3}>
            <TimeLine tasks={toDoList?.documents} currentDate={new Date()} />
          </Box>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default Dashboard;
