import AppError from '@/errors/AppError';
import { ErrorRequestHandler } from 'express';
import { BAD_REQUEST } from 'http-status';
import { Error as MongooseError } from 'mongoose';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err: Error, _req, res, next) => {
  if (res.headersSent) {
    return next('Something went wrong!');
  }
  let statusCode = err instanceof AppError ? err.statusCode : 500;
  let message = err instanceof AppError ? 'App Error' : err.message || 'Server Error!';
  let errorMessage = err.message || 'Something went wrong!';
  console.log(err.name, 'name');

  if (err instanceof ZodError) {
    message = 'Validation Error';
    statusCode = BAD_REQUEST;
    errorMessage = err.issues.reduce((acc, { path, message: msg }) => {
      const lastPath = path?.[path.length - 1];
      return `${acc}${acc ? ' ' : ''}${lastPath} is ${msg?.toLowerCase()}.`;
    }, '');
  } else if (err.name === 'CastError') {
    message = 'Invalid ID';
    statusCode = BAD_REQUEST;
    errorMessage = `${(err as MongooseError.CastError).stringValue} is not a valid ID!`;
  } else if ('code' in err && err.code === 11000) {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];

    message = 'Duplicate Entry';
    statusCode = BAD_REQUEST;
    errorMessage = `${extractedMessage} is already exists`;
  } else if (err instanceof MongooseError.ValidationError) {
    message = 'Validation Error';
    statusCode = BAD_REQUEST;
    errorMessage = Object.values(err.errors).reduce(
      (acc, { message: msg }) => `${acc}${acc ? ' ' : ''}${msg}`,
      '',
    );
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails: err,
    stack: err.stack,
  });
};

export default globalErrorHandler;
