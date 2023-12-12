import { Schema } from 'mongoose';

type TReview = {
  _id: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  rating: number;
  review: string;
};

export default TReview;
