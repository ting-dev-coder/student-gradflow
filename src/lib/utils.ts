import { clsx, type ClassValue } from 'clsx';
import { isBefore, format } from 'date-fns';
import dayjs from 'dayjs';
import { parseISO, isSameDay, startOfDay } from 'date-fns';

export function dateFormat(date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}

export function isTodayBefore(date: string) {
  const today = format(new Date(), 'yyyy-MM-dd');
  return isBefore(new Date(date), today);
}

/**
 * Converts a date string and a custom time array into an ISO formatted date string.
 *
 * @param {string} dateStr - The date string in the format 'YYYY-MM-DD'
 * @param {[string, string, string]} timeArray - The time array in the format [hour, minute, 'AM'/'PM']
 * @returns {string} - The ISO formatted date string
 */
export function convertCustomTimeToISO(dateStr, timeArray) {
  if (!timeArray.length) return '';
  const [hour, minute, meridiem] = timeArray;
  hour = parseInt(hour, 10);
  minute = parseInt(minute, 10);
  // Convert 12-hour format to 24-hour format
  if (meridiem.toUpperCase() === 'PM' && hour < 12) {
    hour += 12;
  } else if (meridiem.toUpperCase() === 'AM' && hour === 12) {
    hour = 0;
  }

  const baseDate = parseISO(dateStr);
  baseDate.setHours(hour, minute, 0, 0);

  return baseDate.toISOString();
}

export function groupByDateAndSumMins(data: { date: string; mins: number }[]) {
  if (!data) return 0;
  const result = data.reduce((acc, item) => {
    const date = startOfDay(parseISO(item.date));

    const existing = acc.find((entry) => isSameDay(entry.date, date));

    if (existing) {
      existing.mins += item.mins;
    } else {
      acc.push({ date, mins: item.mins });
    }

    return acc;
  }, [] as { date: Date; mins: number }[]);

  return result;
}
