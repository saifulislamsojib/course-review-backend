import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import { createCategory, getAllCategories } from './category.controller';
import { createCategorySchema } from './category.validation';

const categoryRoutes = Router();

categoryRoutes.get('/', getAllCategories);
categoryRoutes.post('/', validateRequest(createCategorySchema), createCategory);

export default categoryRoutes;
