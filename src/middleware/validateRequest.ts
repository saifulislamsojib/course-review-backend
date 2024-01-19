import catchAsync from '@/utils/catchAsync';
import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject): RequestHandler => {
  // validation check
  return catchAsync(async (req, _res, next) => {
    await schema.parseAsync(req.body);
    next();
  });
};

export default validateRequest;
