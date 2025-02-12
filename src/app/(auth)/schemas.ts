import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Required Field'),
    email: z.string().email(),
    password: z.string().min(8, 'Minimum 8 characters'),
    confirmPassword: z.string().min(1, 'Required Field'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });
