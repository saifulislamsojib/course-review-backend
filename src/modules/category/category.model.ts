import mongoose, { Schema } from 'mongoose';
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
  },
  { timestamps: true },
);

const CategoryModel = mongoose.model<TCategory>('Category', categorySchema);

export default CategoryModel;
