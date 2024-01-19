import { ObjectId } from 'mongoose';

export type Tag = {
  name: string;
  isDeleted: boolean;
};

export type Details = {
  level: string;
  description: string;
};

type TCourse = {
  _id: ObjectId;
  title: string;
  instructor: string;
  categoryId: ObjectId;
  price: number;
  tags: Tag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: Details;
  createdBy: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export default TCourse;
