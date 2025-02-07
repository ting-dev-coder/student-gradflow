import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';

export function dateFormat(date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}

export function parseTimeToDate(timeObj: {
  hour: number;
  min: number;
  session: 'AM' | 'PM';
}): Date {
  let { hour, min, session } = timeObj;

  // 轉換 12 小時制到 24 小時制
  if (session === 'PM' && hour !== 12) {
    hour += 12;
  } else if (session === 'AM' && hour === 12) {
    hour = 0;
  }

  // 取得當天日期並設定時間
  const now = new Date();
  now.setHours(hour, min, 0, 0);

  return now;
}
