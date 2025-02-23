import { z } from 'zod';

export const createCountdownSchema = z.object({
  name: z.string().trim().min(1, 'required field'),
  endAt: z.coerce.date(),
  image: z
    .instanceof(File, {
      message: 'Invalid file type',
    })
    .optional(),
  localImagePath: z.preprocess(
    (val) => (val == null ? '' : val.toString()),
    z.string().optional()
  ),
  // image: z
  //   .union([
  //     z.instanceof(File),
  //     z.string().transform((val) => (val === '' ? undefined : val)),
  //   ])
  //   .optional(),
});

export const updateCountdownSchema = z.object({
  endAt: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => date instanceof Date, {
      message: 'Invalid date',
    })
    .optional(),
  isMain: z
    .enum(['true', 'false'])
    .transform((value) => value === 'true')
    .optional(),
});
