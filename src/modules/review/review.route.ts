import authCheck from '@/middleware/authCheck';
import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import { createReview, getReviewsByCourseId } from './review.controller';
import { createReviewSchema } from './review.validation';

const reviewRoutes = Router();

reviewRoutes.post('/', authCheck('user'), validateRequest(createReviewSchema), createReview);
reviewRoutes.get('/:courseId', getReviewsByCourseId);

export default reviewRoutes;
