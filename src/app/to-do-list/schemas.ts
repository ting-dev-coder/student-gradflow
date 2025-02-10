import dayjs from 'dayjs';
import { z } from 'zod';

export const createTodoSchema = z
  .object({
    title: z.string().trim().min(1, 'required field'),
    startDate: z.string().min(1, 'required field'),
    startTime: z
      .array(z.union([z.string(), z.number()]))
      .nullish()
      .default([]),
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

    if (data.allDay) {
      data.startTime = [];
    }
  });

export const editTodoSchema = z
  .object({
    title: z.string().trim().min(1, 'required field'),
    startDate: z.string().min(1, 'required field'),
    startTime: z.array(z.union([z.string(), z.number()])).optional(),
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

    if (data.allDay) {
      data.startTime = [];
    }
  });
