import React, { useEffect, useMemo, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  Badge,
  Box,
  Divider,
  Group,
  Stack,
  Tabs,
  Text,
  Tooltip,
} from '@mantine/core';
import { convertCustomTimeToISO, dateFormat } from '@/lib/utils';
import { parseISO, format } from 'date-fns';
import './timeline.scss';

let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}

const TimeLine = ({ tasks, currentDate, upcomingTasks }) => {
  const [activeTab, setActiveTab] = useState('today');
  const calendarRef = useRef(null);

  // Custom tab change handler
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  const taskList = useMemo(
    () => (activeTab === 'today' ? tasks : upcomingTasks),
    [activeTab, tasks, upcomingTasks]
  );

  const events = useMemo(() => {
    if (!taskList || activeTab !== 'today') return [];

    return taskList.map((task) => {
      const todayTitle = task.allDay
        ? task.startDate
        : convertCustomTimeToISO(task.startDate, task.startTime);

      return {
        id: createEventId(),
        title: task.title,
        start: todayTitle,
        extendedProps: {
          isComingDay: false,
          category: task.category,
          date: task.startDate,
        },
      };
    });
  }, [taskList, activeTab]);

  // Initialize calendar and set date
  useEffect(() => {
    if (!calendarRef?.current || activeTab !== 'today') return;

    // Use setTimeout to ensure the calendar API is available
    setTimeout(() => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(parseISO(dateFormat(currentDate)));
        // Force events to refresh
        calendarApi.refetchEvents();
      }
    }, 10);
  }, [currentDate, activeTab]);

  // Render upcoming tasks as a list
  const renderUpcomingTasksList = () => {
    if (!upcomingTasks || upcomingTasks.length === 0) {
      return (
        <Text ta="center" c="dimmed" py="xl">
          No upcoming tasks
        </Text>
      );
    }

    return (
      <Stack gap="xs" p="xs" className="upcoming-tasks-list">
        {upcomingTasks.map((task, index) => (
          <Box key={`${task.title}-${index}`} className="task-list-item" p="xs">
            {!!index && <Divider mb="sm" />}
            <Group justify="space-between" mb="xs">
              <Text size="sm" c="dimmed">
                {format(new Date(task.startDate), 'MMM dd, yyyy')}
              </Text>
              <Text size="sm">
                {task.allDay
                  ? 'All day'
                  : `${task.startTime[0]}:${
                      task.startTime[1] == 0 ? '00' : task.startTime[1]
                    } ${task.startTime[2]}`}
              </Text>
            </Group>

            <Group gap={'xs'} justify="space-between">
              <Text fw={500}>{task.title}</Text>
              <Badge bg="var(--primary)">{task.category}</Badge>
            </Group>
          </Box>
        ))}
      </Stack>
    );
  };

  // Only render FullCalendar when in Today tab
  const renderCalendar = () => {
    if (activeTab !== 'today') return null;

    return (
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
    );
  };

  return (
    <Stack gap="0" className="to-do-timeline" miw="230" h="100%">
      <Tabs
        mb="md"
        color="var(--primary)"
        value={activeTab}
        onChange={handleTabChange}
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

      {activeTab === 'today' ? (
        renderCalendar()
      ) : (
        <Box>{renderUpcomingTasksList()}</Box>
      )}
    </Stack>
  );
};

function renderEventContent({ event }) {
  console.log('來喔', event);

  return (
    <Box
      className="event-card"
      style={{
        cursor: event.extendedProps.isComingDay ? 'pointer' : 'default',
      }}
    >
      <Text truncate>{event.title}</Text>
      <div className="event-card_category">{event.extendedProps.category}</div>
    </Box>
  );
}

export default TimeLine;
