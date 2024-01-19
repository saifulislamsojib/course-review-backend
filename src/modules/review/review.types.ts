import { ObjectId } from 'mongoose';

type TReview = {
  _id: ObjectId;
  courseId: ObjectId;
  rating: number;
  review: string;
  createdBy: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export default TReview;
