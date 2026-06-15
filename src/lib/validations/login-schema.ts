import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Error Text Helper' })
    .email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(1, { message: 'Error Text Helper' })
    .min(6, { message: 'Password minimal 6 karakter' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
