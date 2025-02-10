import { createContext, use, useState } from 'react';
import { DayPicker, Week, WeekProps, DayButtonProps } from 'react-day-picker';
import {
  format,
  addDays,
  endOfWeek,
  isWithinInterval,
  startOfWeek,
} from 'date-fns';
import 'react-day-picker/style.css';
import { ActionIcon, Box, Group, Stack, UnstyledButton } from '@mantine/core';
import styles from './weeky-calendar.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CurrentWeekRowProps extends WeekProps {
  date: Date;
}
const SelectedDateContext = createContext<{
  selected?: Date;
  setSelected?: React.Dispatch<React.SetStateAction<Date | undefined>>;
}>({});
function DayButton(props: DayButtonProps) {
  const { day, modifiers, onClick } = props;
  const { setSelected } = use(SelectedDateContext);
  return (
    <Stack
      gap="0"
      className={`${styles['day_week_wrapper']} ${
        props.modifiers.selected && styles['day_selected']
      }`}
      onClick={(e) => {
        console.log('select?');
        e.preventDefault();
        setSelected?.(day.date);
      }}
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
  return isNotCurrentWeek ? null : <Week {...props} />;
}

const DateCalendar = ({ onChange, defaultDate }) => {
  const [value, setValueChange] = useState(defaultDate);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [month, setMonth] = useState(defaultDate);

  function handleMonthChange(e, num: 1 | -1) {
    e.preventDefault();

    const date = addDays(value, 7 * num);
    setValueChange(date);
    setMonth(date);
  }

  function handleDayClick(day) {
    setSelectedDate(day);
    onChange(day);
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
          <ActionIcon
            variant="default"
            onClick={(e) => handleMonthChange(e, 1)}
          >
            <IoIosArrowForward />
          </ActionIcon>
        ),
        PreviousMonthButton: () => (
          <ActionIcon
            variant="default"
            onClick={(e) => handleMonthChange(e, -1)}
          >
            <IoIosArrowBack />
          </ActionIcon>
        ),
      }}
      selected={selectedDate}
      onSelect={handleDayClick}
      month={month}
      onMonthChange={setMonth}
      required
      showOutsideDays
      mode="single"
    />
  );
};

export default DateCalendar;
