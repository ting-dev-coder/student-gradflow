import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';

export function dateFormat(date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}
