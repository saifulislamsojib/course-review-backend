import Category from './category.model';
import TCategory from './category.types';

// eslint-disable-next-line arrow-body-style
export const createCategoryToDb = (category: Omit<TCategory, '_id'>) => {
  return new Category(category).save();
};

export const getAllCategoriesFromDb = () => Category.find().select(['_id', 'name']);
