import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mantine/core';

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
  },
];

// [
//   {
//     title: 'Meeting',
//     start: '2024-01-29T10:00:00',
//     end: '2024-01-29T12:00:00',
//   },
//   {
//     title: 'Lunch',
//     start: '2024-01-29T13:00:00',
//     end: '2024-01-29T14:00:00',
//   },
// ]

export function createEventId() {
  return String(eventGuid++);
}
const TimeLine = () => {
  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }
  function handleEventClick(clickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    console.log('handleEvents', events);
  }

  return (
    <Box miw="230" h={'100%'}>
      <FullCalendar
        plugins={[timeGridPlugin]}
        slotMinTime="08:00:00" // 設定最早時間
        slotMaxTime="20:00:00" // 設定最晚時間
        initialView="timeGridDay"
        events={INITIAL_EVENTS}
        headerToolbar={false}
        // editable={false}
        // selectable={true}
        // selectMirror={true}
        // dayMaxEvents={true}
        // weekends={false}
        initialEvents={INITIAL_EVENTS}
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
