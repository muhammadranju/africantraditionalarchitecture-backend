import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IForum } from './forums.interface';
import Forum from './forums.model';
import ForumCategory from '../forums_category/forums-category.model';
``;
const createForumToDB = async (forumData: IForum, user: any) => {
  const ownerId = user.id;

  const findCategory = await ForumCategory.findById(forumData.category);
  if (!findCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Category not found!');
  }

  const result = new Forum({
    ...forumData,
    owner: ownerId,
    type: findCategory.type,
    refSlug: findCategory.slug,
  });
  result.validateSync();
  findCategory.posts.push(result._id);
  await findCategory.save();
  const savedForum = await result.save();
  return savedForum;
};

const getAllForumsFromDB = async (type: string, ref: string) => {
  let query = {};
  if (type && ref) {
    query = { type, refSlug: ref };
  } else if (ref) {
    query = { refSlug: ref };
  } else if (type) {
    query = { type };
  } else {
    query = {};
  }
  const getViews = await ForumCategory.findOne({
    slug: ref,
  });

  if (getViews) {
    getViews.views += 1;
    await getViews.save();
  }

  const result = await Forum.find({
    ...query,
  }).populate('owner', 'name role email image');

  return result;
};

const getForumByIdFromDB = async (slug: string) => {
  const result = await Forum.findOne({ slug }).populate(
    'owner',
    'name role email image'
  );
  return result;
};

const updateForumToDB = async (id: string, forumData: IForum) => {
  const result = await Forum.findById(id);

  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Forum doesn't exist!");
  }

  result.set(forumData);
  result.validateSync();
  const updatedForum = await result.save();
  return updatedForum;
};

const deleteForumToDB = async (id: string) => {
  const result = await Forum.findByIdAndDelete(id);
  return result;
};

export const ForumService = {
  createForumToDB,
  getAllForumsFromDB,
  updateForumToDB,
  deleteForumToDB,
  getForumByIdFromDB,
};
