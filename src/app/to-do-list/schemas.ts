import dayjs from 'dayjs';
import { z } from 'zod';

export const createTodoSchema = z
  .object({
    title: z.string().trim().min(1, 'required field'),
    startDate: z.string().min(1, 'required field'),
    startTime: z.array(z.union([z.string(), z.number()])).optional(),
    endTime: z.array(z.union([z.string(), z.number()])).optional(),
    allDay: z
      .preprocess((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase() === 'true';
        }
        return value;
      }, z.boolean())
      .default(false),
    category: z.string(),
    status: z.string(),
    description: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.allDay && !data.startTime?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'required field',
        path: ['startTime'],
      });
    }

    // // startTime 和 endTime 都存在時，確保 startTime 早於 endTime
    if (data.startTime && data.endTime) {
      const start = data.startTime;
      const end = data.endTime;

      const timeStart = dayjs(`${start[0]}:${start[1]} ${start[2]}`, 'h:mm A');
      const timeEnd = dayjs(`${end[0]}:${end[1]} ${end[2]}`, 'h:mm A');

      if (timeStart.isAfter(timeEnd) || timeStart.isSame(timeEnd)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'endTime must be later than startTime',
          path: ['endTime'],
        });
      }
    }
  });

export const editTodoSchema = z
  .object({
    title: z.string().trim().min(1, 'required field'),
    startDate: z.string().min(1, 'required field'),
    startTime: z.array(z.union([z.string(), z.number()])).optional(),
    endTime: z.array(z.union([z.string(), z.number()])).optional(),
    allDay: z
      .preprocess((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase() === 'true';
        }
        return value;
      }, z.boolean())
      .default(false),
    category: z.string(),
    status: z.string(),
    description: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.allDay && !data.startTime?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'required field',
        path: ['startTime'],
      });
    }

    // // startTime 和 endTime 都存在時，確保 startTime 早於 endTime
    if (data.startTime && data.endTime) {
      const start = data.startTime;
      const end = data.endTime;

      const timeStart = dayjs(`${start[0]}:${start[1]} ${start[2]}`, 'h:mm A');
      const timeEnd = dayjs(`${end[0]}:${end[1]} ${end[2]}`, 'h:mm A');

      if (timeStart.isAfter(timeEnd) || timeStart.isSame(timeEnd)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'endTime must be later than startTime',
          path: ['endTime'],
        });
      }
    }
  });
