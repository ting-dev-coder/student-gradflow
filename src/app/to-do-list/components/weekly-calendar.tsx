import { useState } from 'react';
import { DayPicker, Week, WeekProps } from 'react-day-picker';
import { endOfWeek, isWithinInterval, startOfWeek } from 'date-fns';
import 'react-day-picker/style.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function CurrentWeekRow(props: WeekProps) {
  console.log(props);
  const isDateInCurrentWeek = (dateToCheck: Date) => {
    const today = new Date();
    const start = startOfWeek(today);
    const end = endOfWeek(today);
    return isWithinInterval(dateToCheck, { start, end });
  };

  const isNotCurrentWeek = props.week.days.every(
    (day) => !isDateInCurrentWeek(day.date)
  );
  if (isNotCurrentWeek) return <></>;
  return <Week {...props} />;
}

const DateCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <>
      <DayPicker
        components={{ Week: CurrentWeekRow }}
        showOutsideDays
        mode="single"
      />
    </>
  );
};

export default DateCalendar;
