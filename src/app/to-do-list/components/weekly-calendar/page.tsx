import { useState } from 'react';
import { DayPicker, Week, WeekProps, DayButtonProps } from 'react-day-picker';
import {
  format,
  addDays,
  endOfWeek,
  isWithinInterval,
  startOfWeek,
} from 'date-fns';
import 'react-day-picker/style.css';
import { Box, Group, Stack, UnstyledButton } from '@mantine/core';
import styles from './weeky-calendar.module.scss';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CurrentWeekRowProps extends WeekProps {
  date: Date;
}

function DayButton(props: DayButtonProps) {
  const { day, modifiers, ...buttonProps } = props;

  //const { setSelected } = React.use(SelectedDateContext);
  return (
    <Stack
      gap="0"
      className={`${styles['day_week_wrapper']} ${
        props.modifiers.selected && styles['day_selected']
      }`}
    >
      <Box>{format(props.day.date, 'EEE')}</Box>
      <UnstyledButton {...props}></UnstyledButton>
    </Stack>
  );
}

function CurrentWeekRow(props: CurrentWeekRowProps) {
  const isDateInCurrentWeek = (dateToCheck: Date) => {
    const start = startOfWeek(props.date);
    const end = endOfWeek(props.date);
    return isWithinInterval(dateToCheck, { start, end });
  };
  const isNotCurrentWeek = props.week.days.every(
    (day) => !isDateInCurrentWeek(day.date)
  );
  if (isNotCurrentWeek) return <></>;

  return <Week {...props} />;
}

const DateCalendar = ({ onChange }) => {
  const [value, setValueChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleMonthChange(e, num: 1 | -1) {
    e.preventDefault();

    setValueChange(addDays(value, 7 * num));
  }

  function handleDayClick(day) {
    console.log(day);
    setSelectedDate(day);
  }

  return (
    <DayPicker
      classNames={{
        root: styles['root'],
        day_button: styles['day_button'],
        weekday: styles['weekday'],
        day: styles['day'],
      }}
      components={{
        //WeekNumber: () => <>WeekNumber</>,
        Weekdays: () => <></>,
        DayButton,
        Week: (weekProps) => <CurrentWeekRow {...weekProps} date={value} />,
        NextMonthButton: () => (
          <button onClick={(e) => handleMonthChange(e, -1)}>Next Week</button>
        ),
        PreviousMonthButton: () => (
          <button onClick={(e) => handleMonthChange(e, 1)}>
            Previous Week
          </button>
        ),
      }}
      selected={selectedDate}
      onSelect={handleDayClick}
      required
      showOutsideDays
      mode="single"
    />
  );
};

export default DateCalendar;
