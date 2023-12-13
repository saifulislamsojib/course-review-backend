import { Schema } from 'mongoose';

type TReview = {
  _id: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  rating: number;
  review: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export default TReview;
