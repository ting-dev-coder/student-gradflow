import { Stack, Group, Text } from '@mantine/core';
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis } from 'recharts';

const data = [
  {
    name: 'Mon',
    value: 2,
  },
  {
    name: 'Tue',
    value: 3,
  },
  {
    name: 'Wed',
    value: 0,
  },
  {
    name: 'Thr',
    value: 0,
  },
  {
    name: 'Fri',
    value: 1,
  },
  {
    name: 'Sat',
    value: 9,
  },
  {
    name: 'Sun',
    value: 4,
  },
];

const WeeklyFocusChart = () => {
  return (
    <Stack h="100%">
      <Group>
        <Text>Weekly focus time</Text>
      </Group>
      <ResponsiveContainer width="100%" style={{ flex: 1 }}>
        <BarChart
          height={100}
          data={data}
          margin={{ top: 0, left: -30, right: 0, bottom: -10 }}
        >
          <Bar dataKey="value" fill="var(--yellow2)" />
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={{ stroke: 'var(--yellow2)', strokeWidth: 2 }}
          />
          <YAxis tickLine={false} axisLine={false} />
        </BarChart>
      </ResponsiveContainer>
    </Stack>
  );
};

export default WeeklyFocusChart;
