import Course from './course.model';
import TCourse from './course.types';
import { calculateDurationInWeeks } from './course.utils';

// eslint-disable-next-line arrow-body-style
export const createCourseToDb = (course: Omit<TCourse, '_id'>) => {
  const durationInWeeks = calculateDurationInWeeks(course.startDate, course.endDate);
  return new Course({ ...course, durationInWeeks }).save();
};

export const getAllCategoriesFromDb = () => Course.find().select(['_id', 'name']);
