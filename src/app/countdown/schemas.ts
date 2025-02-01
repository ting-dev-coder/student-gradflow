import { z } from 'zod';

export const createCountdownSchema = z.object({
  name: z.string().trim().min(1, 'required field'),
  endAt: z.coerce.date(),
  // endAt: z.preprocess(
  //   (val) => (typeof val === 'string' ? new Date(val) : val),
  //   z.date()
  // ),

  image: z
    .instanceof(File, {
      message: 'Invalid file type',
    })
    .optional(),
  localImagePath: z.string().optional(),
});

export const updateCountdownSchema = z.object({
  name: z.string().trim().min(1, 'required field'),
  endAt: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => date instanceof Date, {
      message: 'Invalid date',
    }),
  image: z.union([
    z.instanceof(File),
    z.string().transform((val) => (val === '' ? undefined : val)),
  ]),
});
