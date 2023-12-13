import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { RequestHandler } from 'express';
import { CREATED } from 'http-status';
import { createReviewToDb } from './review.service';

export const createReview: RequestHandler = catchAsync(async (req, res) => {
  const response = await createReviewToDb(req.body);
  const data = { ...response.toObject() };
  delete data.createdAt;
  delete data.updatedAt;
  delete data.__v;
  return sendResponse(res, {
    success: true,
    statusCode: CREATED,
    message: 'Review created successfully',
    data,
  });
});

export const getAllCategories: RequestHandler = catchAsync(async () => {
  //   const data = await getAllCategoriesFromDb();
  //   return sendResponse(res, {
  //     success: true,
  //     statusCode: OK,
  //     message: 'Categories retrieved successfully',
  //     data,
  //   });
});
