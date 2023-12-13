import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import { createReview } from './review.controller';
import { createReviewSchema } from './review.validation';

const reviewRoutes = Router();

reviewRoutes.post('/', validateRequest(createReviewSchema), createReview);

export default reviewRoutes;
