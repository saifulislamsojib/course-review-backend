import Review from './review.model';
import TReview from './review.types';

export const createReviewToDb = (review: Omit<TReview, '_id'>) => {
  return new Review(review).save();
};

export const getReviewsByCourseIdFromDb = (courseId: string) => {
  return Review.find({ courseId }).select(['_id', 'rating', 'review']);
};
