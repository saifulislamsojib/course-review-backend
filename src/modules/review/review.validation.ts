import getObjectIdZod from '@/utils/getObjectIdZod';
import { z } from 'zod';

const objectIdZod = getObjectIdZod();

export const createReviewSchema = z.object({
  courseId: objectIdZod,
  rating: z.number().min(1).max(5),
  review: z.string(),
});

export const updateReviewSchema = z.object({
  courseId: objectIdZod.optional(),
  rating: z.number().min(1).max(5).optional(),
  review: z.string().optional(),
});
