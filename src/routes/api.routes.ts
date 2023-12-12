import categoryRoutes from '@/modules/category/category.routes';
import { Router } from 'express';

const apiRoutes = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: categoryRoutes,
  },
];

moduleRoutes.forEach((route) => apiRoutes.use(route.path, route.route));

export default apiRoutes;
