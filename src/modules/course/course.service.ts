import Course from './course.model';
import TCourse from './course.types';

// eslint-disable-next-line arrow-body-style
export const createCourseToDb = (course: Omit<TCourse, '_id' | 'durationInWeeks'>) => {
  return new Course(course).save();
};

export const getAllCategoriesFromDb = () => Course.find().select(['_id', 'name']);
