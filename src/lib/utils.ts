import { clsx, type ClassValue } from 'clsx';
import { isBefore, format } from 'date-fns';
import dayjs from 'dayjs';

export function dateFormat(date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}

export function isTodayBefore(date: string) {
  const today = format(new Date(), 'yyyy-MM-dd');
  return isBefore(new Date(date), today);
}
