import categoryRoutes from '@/modules/category/category.routes';
import coursesRoutes, { courseRoutes } from '@/modules/course/course.route';
import reviewRoutes from '@/modules/review/review.route';
import { Router } from 'express';

const apiRoutes = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/course',
    route: courseRoutes,
  },
  {
    path: '/courses',
    route: coursesRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
];

moduleRoutes.forEach((route) => apiRoutes.use(route.path, route.route));

export default apiRoutes;
