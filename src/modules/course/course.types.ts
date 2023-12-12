import { Schema } from 'mongoose';

export type Tag = {
  name: string;
  isDeleted: boolean;
};

export type Details = {
  level: string;
  description: string;
};

type TCourse = {
  _id: Schema.Types.ObjectId;
  title: string;
  instructor: string;
  categoryId: Schema.Types.ObjectId;
  price: number;
  tags: Tag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: Details;
  createdAt?: Date;
  updatedAt?: Date;
};

export default TCourse;
