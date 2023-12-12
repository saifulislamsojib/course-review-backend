import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { RequestHandler } from 'express';
import { CREATED } from 'http-status';
import { createCourseToDb } from './course.service';

export const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const response = await createCourseToDb(req.body);
  const data = { ...response.toObject() };
  delete data.createdAt;
  delete data.updatedAt;
  return sendResponse(res, {
    success: true,
    statusCode: CREATED,
    message: 'Course created successfully',
    data,
  });
});

export const getPaginatedAndFilteredCourses: RequestHandler = catchAsync(async () => {
  //
});
