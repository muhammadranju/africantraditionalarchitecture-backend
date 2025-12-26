import { IForumCategory } from './forums-category.interface';
import ForumCategory from './forums-category.model';

const createForumCategoryToDB = async (forumCategoryData: IForumCategory) => {
  const result = await ForumCategory.create(forumCategoryData);
  return result;
};

const getForumByCategoryToDB = async (slug: string) => {
  const result = await ForumCategory.find({ type: slug });
  return result;
};

const getForumCategoriesToDB = async () => {
  const result = await ForumCategory.find();
  return result;
};

export const ForumCategoryService = {
  createForumCategoryToDB,
  getForumByCategoryToDB,
  getForumCategoriesToDB,
};
