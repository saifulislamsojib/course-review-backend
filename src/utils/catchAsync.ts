import { RequestHandler } from 'express';

// eslint-disable-next-line arrow-body-style
const catchAsync = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await Promise.resolve(requestHandler(req, res, next));
    } catch (err) {
      next(err);
    }
  };
};

export default catchAsync;
