import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { RequestHandler } from 'express';
import { CREATED, OK } from 'http-status';
import { createCategoryToDb, getAllCategoriesFromDb } from './category.service';

export const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const { name } = req.body;
  const data = await createCategoryToDb({ name });
  return sendResponse(res, {
    success: true,
    statusCode: CREATED,
    message: 'Category created successfully',
    data: {
      _id: data._id,
      name: data.name,
    },
  });
});

export const getAllCategories: RequestHandler = catchAsync(async (req, res) => {
  const data = await getAllCategoriesFromDb();
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Categories retrieved successfully',
    data,
  });
});
