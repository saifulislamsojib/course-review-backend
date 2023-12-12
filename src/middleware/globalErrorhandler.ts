import AppError from '@/errors/AppError';
import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err: Error, _req, res, next) => {
  if (res.headersSent) {
    return next('Something went wrong!');
  }
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: message,
    errorDetails: {},
    stack: err.stack,
  });
};

export default globalErrorHandler;
