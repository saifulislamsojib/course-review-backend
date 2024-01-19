import { z } from 'zod';
import { userRoles } from '../user/user.constant';

const passwordSchema = z
  .string()
  .trim()
  .refine((password) => password.length >= 8, {
    message: 'Password must be at least 8 characters long',
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((password) => /\d/.test(password), {
    message: 'Password must contain at least one digit',
  })
  .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
    message: 'Password must contain at least one special character',
  });

export const registerUserSchema = z.object({
  username: z.string().min(1).max(255),
  email: z.string().email(),
  password: passwordSchema,
  role: z.enum(userRoles).optional(),
});

export const loginUserSchema = z.object({
  username: z.string().min(1).max(255),
  password: passwordSchema,
});

export const changePasswordSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
});
