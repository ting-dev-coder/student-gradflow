import React, { useEffect, useMemo, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Badge, Box, Group, Stack, Tabs, Text } from '@mantine/core';
import { convertCustomTimeToISO, dateFormat } from '@/lib/utils';
import { parseISO } from 'date-fns';
import './timeline.scss';

let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}

const TimeLine = ({ tasks, currentDate, upcomingTasks }) => {
  const [activeTab, setActiveTab] = useState<string | null>('today');
  const calendarRef = useRef(null);

  const taskList = useMemo(
    () => (activeTab === 'today' ? tasks : upcomingTasks),
    [activeTab, tasks, upcomingTasks]
  );

  const events = useMemo(() => {
    if (!taskList) return [];

    return taskList.map((task) => {
      const todayTitle = task.allDay
        ? task.startDate
        : convertCustomTimeToISO(task.startDate, task.startTime);
      return {
        id: createEventId(),
        title: task.title,
        start: activeTab === 'today' ? todayTitle : currentDate,
        extendedProps: {
          category: task.category,
        },
      };
    });
  }, [taskList]);

  useEffect(() => {
    if (!calendarRef?.current) return;
    const calendarApi = calendarRef.current?.getApi();
    calendarApi.gotoDate(parseISO(dateFormat(currentDate)));
  }, [currentDate]);

  // Trigger FullCalendar re-render when events change
  useEffect(() => {
    if (calendarRef?.current) {
      const calendarApi = calendarRef.current?.getApi();
      calendarApi.refetchEvents();
      console.log('taskList', events);
    }
  }, [events]);

  return (
    <Stack gap="0" className="to-do-timeline" miw="230" h="100%">
      <Group>
        <Group gap="xs">
          <Box w="1rem" h="1rem" bg="var(--primary)" />
          <Text>Weekly</Text>
        </Group>
        <Group gap="xs">
          <Box w="1rem" h="1rem" bg="var(--info)" />
          <Text>Today</Text>
        </Group>
      </Group>

      <Tabs
        mb="md"
        color="var(--primary)"
        value={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.List justify="center">
          <Tabs.Tab value="today">Today</Tabs.Tab>
          <Tabs.Tab
            value="upcoming"
            rightSection={
              upcomingTasks?.length ? (
                <Badge size="md" color="var(--error)" circle>
                  {upcomingTasks.length}
                </Badge>
              ) : null
            }
          >
            Upcoming
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        headerToolbar={false}
        events={events}
        dayMaxEventRows={false}
        eventContent={renderEventContent}
        dayHeaders={false}
      />
    </Stack>
  );
};

function renderEventContent({ event }) {
  return (
    <Box className="event-card">
      <Text truncate>{event.title}</Text>
      <div className="event-card_category">{event.extendedProps.category}</div>
    </Box>
  );
}

export default TimeLine;
