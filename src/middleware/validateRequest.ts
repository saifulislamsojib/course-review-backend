import catchAsync from '@/utils/catchAsync';
import { RequestHandler } from 'express';
import { AnyZodObject } from 'zod';

// eslint-disable-next-line arrow-body-style
const validateRequest = (schema: AnyZodObject): RequestHandler => {
  // validation check
  return catchAsync(async (req, _res, next) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validateRequest;
