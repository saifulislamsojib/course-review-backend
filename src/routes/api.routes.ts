import { Router } from 'express';

const apiRoutes = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: apiRoutes,
  },
];

moduleRoutes.forEach((route) => apiRoutes.use(route.path, route.route));

export default apiRoutes;
