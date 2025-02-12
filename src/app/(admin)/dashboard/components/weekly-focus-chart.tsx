import { groupByDateAndSumMins } from '@/lib/utils';
import { Stack, Group, Text } from '@mantine/core';
import { compareAsc, format, parseISO } from 'date-fns';
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis } from 'recharts';

const weekDays = [
  { name: 'Sun', mins: 0 },
  { name: 'Mon', mins: 0 },
  { name: 'Tue', mins: 0 },
  { name: 'Wed', mins: 0 },
  { name: 'Thu', mins: 0 },
  { name: 'Fri', mins: 0 },
  { name: 'Sat', mins: 0 },
];
const aggregateMinsByDay = (data, weekDays) => {
  data.forEach((item) => {
    const dayName = format(item?.date, 'EEE');
    const weekDay = weekDays.find((entry) => entry.name === dayName);

    console.log('item', weekDay);

    if (weekDay) {
      weekDay.mins += item.mins;
    }
  });

  return weekDays.map(({ name, mins }) => ({ name, value: mins }));
};

const WeeklyFocusChart = ({ data }) => {
  if (!data) return;

  const groupedData = groupByDateAndSumMins(data);
  const chartData = aggregateMinsByDay(groupedData, weekDays);

  return (
    <Stack h="100%">
      <Group>
        <Text>Weekly focus time</Text>
      </Group>
      <ResponsiveContainer width="100%" style={{ flex: 1 }}>
        <BarChart
          height={100}
          data={chartData}
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
