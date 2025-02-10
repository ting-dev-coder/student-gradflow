import React, { useEffect, useMemo, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mantine/core';
import { convertCustomTimeToISO, dateFormat } from '@/lib/utils';
import { parseISO } from 'date-fns';

let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}
const TimeLine = ({ tasks, currentDate }) => {
  const calendarRef = useRef(null);
  const events = useMemo(() => {
    if (!tasks) return [];
    console.log(tasks);
    const newTasks = tasks.map((task) => ({
      id: createEventId(),
      title: task.title,
      start: task.allDay
        ? task.startDate
        : convertCustomTimeToISO(task.startDate, task.startTime),
    }));
    goToSpecificDate(dateFormat(currentDate));
    return newTasks;
  }, [tasks]);

  useEffect(() => {
    console.log('events', events);
  }, [events]);

  function goToSpecificDate(date: string) {
    if (!calendarRef?.current) return;
    const calendarApi = calendarRef.current?.getApi();
    calendarApi.gotoDate(parseISO(date)); // 跳轉到 2025-02-15
  }

  return (
    <Box miw="230" h={'100%'}>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin]}
        slotMinTime="08:00:00" // 設定最早時間
        slotMaxTime="20:00:00" // 設定最晚時間
        initialView="timeGridDay"
        headerToolbar={false}
        events={events}
        // editable={false}
        // selectable={true}
        // selectMirror={true}
        // dayMaxEvents={true}
        // weekends={false}
        // initialEvents={events}
        // alternatively, use the `events` setting to fetch from a feed
        // select={handleDateSelect}
        // eventContent={renderEventContent} // custom render function
        // eventClick={handleEventClick}
        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
      />
    </Box>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default TimeLine;
