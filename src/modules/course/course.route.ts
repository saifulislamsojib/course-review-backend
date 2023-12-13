import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import { createCourse, getPaginatedAndFilteredCourses, updateCourse } from './course.controller';
import { createCourseSchema } from './course.validation';

const coursesRoutes = Router();

export const courseRoutes = Router();

// create a new course api routes
courseRoutes.post('/', validateRequest(createCourseSchema), createCourse);

// get paginated and filtered courses
coursesRoutes.get('/', getPaginatedAndFilteredCourses);

coursesRoutes.put('/:courseId', updateCourse);

export default coursesRoutes;
