import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { RequestHandler } from 'express';
import { CREATED, OK } from 'http-status';
import { createCategoryToDb, getAllCategoriesFromDb } from './category.service';

export const createCategory: RequestHandler = catchAsync(async (req, res) => {
  req.body.createdBy = req.user?._id;
  let data = await createCategoryToDb(req.body);
  data = data.toObject();
  delete data.__v;
  return sendResponse(res, {
    success: true,
    statusCode: CREATED,
    message: 'Category created successfully',
    data,
  });
});

export const getAllCategories: RequestHandler = catchAsync(async (req, res) => {
  const data = await getAllCategoriesFromDb();
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Categories retrieved successfully',
    data: { categories: data },
  });
});
