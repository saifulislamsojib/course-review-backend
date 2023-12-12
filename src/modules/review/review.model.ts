import mongoose, { Schema } from 'mongoose';
import TReview from './review.types';

const reviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const ReviewModel = mongoose.model<TReview>('Review', reviewSchema);

export default ReviewModel;
