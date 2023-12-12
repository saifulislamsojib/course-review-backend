import getObjectIdZod from '@/utils/getObjectIdZod';
import { z } from 'zod';

const objectIdZod = getObjectIdZod();

const createTagSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const createDetailsSchema = z.object({
  level: z.string(),
  description: z.string(),
});

export const createCourseSchema = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: objectIdZod,
  price: z.number().refine((value) => value >= 0, {
    message: 'Price must be positive number',
  }),
  tags: z.array(createTagSchema),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  details: createDetailsSchema,
});

const updateTagSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const updateDetailsSchema = z.object({
  level: z.string().optional(),
  description: z.string().optional(),
});

export const updateCourseSchema = z.object({
  title: z.string().optional(),
  instructor: z.string().optional(),
  categoryId: objectIdZod.optional(),
  price: z
    .number()
    .refine((value) => (value ? value >= 0 : true), {
      message: 'Price must be positive number',
    })
    .optional(),
  tags: z.array(updateTagSchema).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  language: z.string().optional(),
  provider: z.string().optional(),
  durationInWeeks: z.number().optional(),
  details: updateDetailsSchema.optional(),
});
