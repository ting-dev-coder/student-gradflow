import { memo } from 'react';
import { GeocodingResponse, WeatherData } from '../hooks/types';
import { Box, Card, Center, Grid, Group, Image, Text, Title } from '@mantine/core';
import { LuAArrowDown, LuAArrowUp, LuDroplets, LuWind } from 'react-icons/lu';
import { HiOutlineArrowDown, HiOutlineArrowUp } from 'react-icons/hi';

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName, error }: CurrentWeatherProps) {
  if (!data) return;

  if(error) {
    return <Center>
      {error}
    </Center>
  }

  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card py="xs" px="sm">
      <Group gap="sm" align="center">
        <Title order={2} c="var(--primary)">
          {locationName?.name}
        </Title>
        {locationName?.state && (
          <Text fz="sm" span c="var(--gray3)">
            {locationName.state} {locationName?.country}
          </Text>
        )}
      </Group>
      <Group gap={'sm'}>
        <Box flex={3} maw={'fit-content'}>
          <Group flex={1} gap="1.115rem">
            <Text fw={700} lh={1} fz="4.5rem" c="var(--primary)">
              {formatTemp(temp)}
            </Text>
            <Box>
              <Text fz="lg" c="var(--gray3)">
                Feels like {formatTemp(feels_like)}
              </Text>
              <Text pr="sm" span c="var(--info)">
                <HiOutlineArrowDown size={10} />
                {formatTemp(temp_min)}
              </Text>
              <Text span c="var(--error)">
                <HiOutlineArrowUp size={10} />
                {formatTemp(temp_max)}
              </Text>
            </Box>
          </Group>

          <Group gap={'xs'}>
            <Group gap={'xs'}>
              <LuDroplets size={20} color="var(--primary)" />
              <Box>
                <Text fz="12px">Humidity</Text>
                <Text fz="10px" fw="600" c="var(--gray3)">
                  {humidity}%
                </Text>
              </Box>
            </Group>
            <Group gap={'xs'}>
              <LuWind size={20} color="var(--primary)" />
              <Box>
                <Text fz="12px">Wind Speed</Text>
                <Text fz="10px" fw="600" c="var(--gray3)">
                  {speed} m/s
                </Text>
              </Box>
            </Group>
          </Group>
        </Box>
        <Box flex={1}>
          <Image
            mt="-24px"
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
            alt={currentWeather.description}
            w={'100%'}
          />
          <Text fz="xs" ta="center" mt="-18px" c="var(--gray3)" tt="capitalize">
            {currentWeather.description}
          </Text>
        </Box>
      </Group>
    </Card>
  );
}

export default memo(CurrentWeather);
