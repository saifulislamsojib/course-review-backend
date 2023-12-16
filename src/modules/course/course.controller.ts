import AppError from '@/errors/AppError';
import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { RequestHandler } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status';
import { Error as MongooseError } from 'mongoose';
import {
  createCourseToDb,
  getBestCourseFromDb,
  getCourseByIdWithReviewsFromDb,
  getPaginatedAndFilteredCoursesFromDb,
  updateCourseIntoDb,
} from './course.service';

export const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const response = await createCourseToDb(req.body);
  const data = { ...response.toObject() };
  delete data.createdAt;
  delete data.updatedAt;
  delete data.__v;
  return sendResponse(res, {
    success: true,
    statusCode: CREATED,
    message: 'Course created successfully',
    data,
  });
});

export const getPaginatedAndFilteredCourses: RequestHandler = catchAsync(async (req, res) => {
  const result = await getPaginatedAndFilteredCoursesFromDb(req.query as Record<string, string>);
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Courses retrieved successfully',
    ...result,
  });
});

export const getCourseByIdWithReviews: RequestHandler = catchAsync(async (req, res) => {
  const data = await getCourseByIdWithReviewsFromDb(req.params.courseId);
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Course and Reviews retrieved successfully',
    data,
  });
});

export const updateCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const { data, error } = await updateCourseIntoDb(req.params.courseId, req.body);
  if (!data) {
    if (error instanceof MongooseError.CastError) {
      return next(error);
    }
    throw new AppError(
      (error as AppError).statusCode || BAD_REQUEST,
      (error as Error).message || 'Course not updated',
    );
  }
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Course updated successfully',
    data,
  });
});

export const getBestCourse: RequestHandler = catchAsync(async (_req, res) => {
  const data = await getBestCourseFromDb();
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Best course retrieved successfully',
    data,
  });
});
