import { memo } from 'react';
import { GeocodingResponse, WeatherData } from '../hooks/types';
import { Box, Card, Group, Image } from '@mantine/core';
import { LuAArrowDown, LuAArrowUp, LuDroplets, LuWind } from 'react-icons/lu';

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  if (!data) return;

  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card>
      <Group align="center">
        <h2 className="text-2xl font-bold tracking-tight">
          {locationName?.name}
        </h2>
        {locationName?.state && (
          <span className="text-muted-foreground">, {locationName.state}</span>
        )}
        <p className="text-sm text-muted-foreground">{locationName?.country}</p>
      </Group>

      <Group>
        <Group flex={1}>
          {formatTemp(temp)}
          <Box>
            <p className="text-sm font-medium text-muted-foreground">
              Feels like {formatTemp(feels_like)}
            </p>
            <span className="flex items-center gap-1 text-blue-500">
              <LuAArrowDown className="h-3 w-3" />
              {formatTemp(temp_min)}
            </span>
            <span className="flex items-center gap-1 text-red-500">
              <LuAArrowUp className="h-3 w-3" />
              {formatTemp(temp_max)}
            </span>
          </Box>
        </Group>
        <Box w="145px">
          <Image
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
            alt={currentWeather.description}
            w={'100%'}
          />
          {currentWeather.description}
        </Box>
      </Group>
      <Group>
        <Group>
          <LuDroplets />
          <div>
            <p className="text-sm font-medium">Humidity</p>
            <p className="text-sm text-muted-foreground">{humidity}%</p>
          </div>
        </Group>
        <Group>
          <LuWind className="h-4 w-4 text-blue-500" />
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Wind Speed</p>
            <p className="text-sm text-muted-foreground">{speed} m/s</p>
          </div>
        </Group>
      </Group>
    </Card>
  );
}

export default memo(CurrentWeather);
