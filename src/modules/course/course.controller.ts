import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { RequestHandler } from 'express';
import { CREATED, OK } from 'http-status';
import { createCourseToDb, getPaginatedAndFilteredCoursesFromDb } from './course.service';

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
