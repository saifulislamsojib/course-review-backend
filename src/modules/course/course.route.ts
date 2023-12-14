import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import {
  createCourse,
  getBestCourse,
  getCourseByIdWithReviews,
  getPaginatedAndFilteredCourses,
  updateCourse,
} from './course.controller';
import { createCourseSchema } from './course.validation';

const coursesRoutes = Router();

export const courseRoutes = Router();

// create a new course api routes
courseRoutes.post('/', validateRequest(createCourseSchema), createCourse);
// create a new course api routes
courseRoutes.get('/best', getBestCourse);

// get paginated and filtered courses
coursesRoutes.get('/', getPaginatedAndFilteredCourses);

coursesRoutes.put('/:courseId', updateCourse);

coursesRoutes.get('/:courseId/reviews', getCourseByIdWithReviews);

export default coursesRoutes;
