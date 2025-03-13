import { groupByDateAndSumMins } from '@/lib/utils';
import { Stack, Group, Text, Skeleton, Button } from '@mantine/core';
import { format } from 'date-fns';
import { BarChart, Bar, ResponsiveContainer, YAxis, XAxis } from 'recharts';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useRouter } from 'next/navigation';

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

const WeeklyFocusChart = ({ data, loading }) => {
  if (!data) return;
  const router = useRouter();
  const groupedData = groupByDateAndSumMins(data);
  const chartData = aggregateMinsByDay(groupedData, weekDays);

  return (
    <Skeleton visible={loading} h="95%">
      <Stack h="100%">
        <Group p="xs" justify="space-between">
          <Text pl="md" c="var(--gray3)">
            Weekly focus time
          </Text>
          <Button
            c="var(--accent)"
            rightSection={<MdKeyboardArrowRight />}
            variant="white"
            onClick={() => router.push('/pomodoro-timer')}
          >
            Start Focusing
          </Button>
        </Group>
        <ResponsiveContainer width="100%" style={{ flex: 1 }}>
          <BarChart
            height={100}
            data={chartData}
            margin={{ top: 0, left: -20, right: 10, bottom: -10 }}
          >
            <Bar dataKey="value" fill="var(--primary)" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: 'var(--primary)', strokeWidth: 2 }}
            />
            <YAxis tickLine={false} axisLine={false} />
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </Skeleton>
  );
};

export default WeeklyFocusChart;
