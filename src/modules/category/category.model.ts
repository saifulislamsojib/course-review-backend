import { Schema, model } from 'mongoose';
import TCategory from './category.types';

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Category = model<TCategory>('Category', categorySchema);

export default Category;
