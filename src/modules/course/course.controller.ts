import AppError from '@/errors/AppError';
import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { RequestHandler } from 'express';
import { CREATED, NOT_FOUND, OK } from 'http-status';
import {
  createCourseToDb,
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

export const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const data = await updateCourseIntoDb(req.params.courseId, req.body);
  if (!data) {
    throw new AppError(NOT_FOUND, 'Course not found');
  }
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Course updated successfully',
    data,
  });
});
