import AppError from '@/errors/AppError';
import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { FilterQuery, PipelineStage, UpdateQuery, startSession } from 'mongoose';
import Course from './course.model';

import Review from '../review/review.model';
import TCourse from './course.types';
import { calculateDurationInWeeks } from './course.utils';

export const createCourseToDb = (course: Omit<TCourse, '_id'>) => {
  const durationInWeeks = calculateDurationInWeeks(course.startDate, course.endDate);
  return new Course({ ...course, durationInWeeks }).save();
};

export const getCourseByIdWithReviewsFromDb = async (id: string) => {
  const notSelect = ['-__v', '-createdAt', '-updatedAt'];
  const course = await Course.findById(id).select(notSelect);
  if (!course?._id) {
    throw new AppError(NOT_FOUND, `Course not found by id ${id}`);
  }
  const reviews = await Review.find({ courseId: id }).select(notSelect);

  return {
    course,
    reviews,
  };
};

export const getBestCourseFromDb = async () => {
  const bestCourse = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        reviewCount: { $sum: '$rating' },
        averageRating: { $avg: '$rating' },
      },
    },
    {
      $sort: { reviewCount: -1 },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        foreignField: '_id',
        localField: '_id',
        from: 'courses',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $project: {
        _id: 0,
        'course.__v': 0,
        'course.createdAt': 0,
        'course.updatedAt': 0,
      },
    },
  ]);

  return bestCourse[0];
};

export const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { tags, durationInWeeks, details, ...other } = payload;

  const updateDoc: UpdateQuery<TCourse> = { $set: other };
  if (tags?.length) {
    const deletedTags = tags.filter((el) => el.name && el.isDeleted).map((el) => el.name);

    if (deletedTags?.length) {
      if (!updateDoc.$pull) {
        updateDoc.$pull = {};
      }
      updateDoc.$pull = {
        tags: { name: { $in: deletedTags } },
      };
    }
  }
  if (durationInWeeks) {
    if (!other.startDate || !other.endDate) {
      throw new AppError(
        BAD_REQUEST,
        'For update durationInWeeks should be also provide startDate and endDate.',
      );
    }
    const newDurationInWeeks = calculateDurationInWeeks(other.startDate, other.endDate);
    if (durationInWeeks !== newDurationInWeeks) {
      throw new AppError(BAD_REQUEST, 'durationInWeeks not matched with startDate and endDate.');
    }
    updateDoc.$set!.durationInWeeks = durationInWeeks;
  }
  if (!durationInWeeks && other.startDate && other.endDate) {
    const newDurationInWeeks = calculateDurationInWeeks(other.startDate, other.endDate);
    updateDoc.$set!.durationInWeeks = newDurationInWeeks;
  }
  if (details) {
    if (details.level) {
      updateDoc.$set!['details.level'] = details.level;
    }
    if (details.description) {
      updateDoc.$set!['details.description'] = details.description;
    }
  }

  const session = await startSession();

  try {
    session.startTransaction();
    let updatedData = await Course.findByIdAndUpdate(id, updateDoc, {
      new: true,
      runValidators: true,
      session,
    });
    if (!updatedData) {
      throw new AppError(NOT_FOUND, 'Course not found');
    }

    if (tags?.length) {
      const newTags = tags.filter((el) => el.name && !el.isDeleted);
      if (newTags?.length) {
        const tagAddUpdateDoc = { $addToSet: { tags: newTags } };

        updatedData = await Course.findByIdAndUpdate(id, tagAddUpdateDoc, {
          new: true,
          runValidators: true,
          session,
        });
      }
      if (!updatedData) {
        throw new AppError(BAD_REQUEST, 'Course not updated');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    updatedData = updatedData.toObject();
    delete updatedData.__v;
    return { data: updatedData };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return { error };
  }
};

export const getPaginatedAndFilteredCoursesFromDb = async (payload: Record<string, string>) => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = payload;
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const filter: FilterQuery<TCourse> = {};
  if (minPrice) {
    filter.price = { $gte: Number(minPrice) };
  }
  if (maxPrice) {
    if (!filter.price) {
      filter.price = {};
    }
    filter.price.$lte = Number(maxPrice);
  }
  if (tags) {
    filter['tags.name'] = tags;
  }
  if (startDate) {
    filter.startDate = startDate;
  }
  if (endDate) {
    filter.endDate = endDate;
  }
  if (language) {
    filter.language = language;
  }
  if (provider) {
    filter.provider = provider;
  }
  if (durationInWeeks) {
    filter.durationInWeeks = Number(durationInWeeks);
  }
  if (level) {
    filter.level = level;
  }

  const pipelines: PipelineStage[] = [
    {
      $match: filter,
    },
  ];

  if (sortBy) {
    pipelines.push({
      $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 },
    });
  }
  pipelines.push({
    $facet: {
      courses: [
        {
          $skip: skip,
        },
        {
          $limit: limitNumber,
        },
        {
          $project: {
            __v: 0,
          },
        },
      ],
      total: [
        {
          $count: 'count',
        },
      ],
    },
  });

  const [response] = await Course.aggregate(pipelines);
  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total: response?.total?.[0]?.count || 0,
    },
    data: response?.courses,
  };
};
