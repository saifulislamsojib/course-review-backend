import Review from './review.model';
import TReview from './review.types';

// eslint-disable-next-line arrow-body-style
export const createReviewToDb = (review: Omit<TReview, '_id'>) => {
  return new Review(review).save();
};

export const getAllCategoriesFromDb = () => Review.find().select(['_id', 'name']);
