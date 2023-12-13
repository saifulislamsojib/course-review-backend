import { FilterQuery, PipelineStage } from 'mongoose';
import Course from './course.model';
import TCourse from './course.types';
import { calculateDurationInWeeks } from './course.utils';

// eslint-disable-next-line arrow-body-style
export const createCourseToDb = (course: Omit<TCourse, '_id'>) => {
  const durationInWeeks = calculateDurationInWeeks(course.startDate, course.endDate);
  return new Course({ ...course, durationInWeeks }).save();
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
