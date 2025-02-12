import { z } from 'zod';

export const createFocusRecordSchema = z.object({
  mins: z.coerce.number(),
  date: z.coerce.date(),
});
