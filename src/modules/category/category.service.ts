import Category from './category.model';
import TCategory from './category.types';

export const createCategoryToDb = (category: Omit<TCategory, '_id'>) => {
  return new Category(category).save();
};

export const getAllCategoriesFromDb = () => {
  return Category.find().select('-__v').populate('createdBy', ['_id', 'username', 'email', 'role']);
};
