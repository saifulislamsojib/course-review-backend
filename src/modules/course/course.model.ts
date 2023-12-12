import { Schema, model } from 'mongoose';
import TCourse from './course.types';

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const detailsSchema = new Schema(
  {
    level: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [tagSchema],
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
      required: true,
    },
    details: {
      type: detailsSchema,
      required: true,
    },
  },
  { timestamps: true },
);

const CourseModel = model<TCourse>('Course', courseSchema);

export default CourseModel;
