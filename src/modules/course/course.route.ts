import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import { createCourse } from './course.controller';
import { createCourseSchema } from './course.validation';

const coursesRoutes = Router();

export const courseRoutes = Router();

// create a new course api routes
courseRoutes.post('/', validateRequest(createCourseSchema), createCourse);

// create a new course api routes
// courseRoutes.post('/', validateRequest(createCourseSchema), createCourse);

export default coursesRoutes;
