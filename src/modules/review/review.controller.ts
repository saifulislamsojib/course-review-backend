import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { RequestHandler } from 'express';
import { CREATED, OK } from 'http-status';
import { createReviewToDb, getReviewsByCourseIdFromDb } from './review.service';

export const createReview: RequestHandler = catchAsync(async (req, res) => {
  const { _id, username, email, role } = req.user || {};
  req.body.createdBy = _id;
  const response = await createReviewToDb(req.body);
  const data = response.toObject();
  delete data.__v;
  return sendResponse(res, {
    success: true,
    statusCode: CREATED,
    message: 'Review created successfully',
    data: {
      ...data,
      createdBy: {
        _id,
        username,
        email,
        role,
      },
    },
  });
});

export const getReviewsByCourseId: RequestHandler = catchAsync(async (req, res) => {
  const data = await getReviewsByCourseIdFromDb(req.params.courseId);
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Reviews retrieved successfully',
    data,
  });
});
