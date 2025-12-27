/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IContents } from './contents.interface';
import Contents from './contents.model';

const createContentToDB = async (contentData: IContents, user: any) => {
  const contentDataWithUser = {
    ...contentData,

    owner: user.id,
  };

  const result = await Contents.create(contentDataWithUser);
  return result;
};

const getContentByCategoryToDB = async (category: string) => {
  const result = await Contents.find({ category }).sort({ createdAt: -1 });
  return result;
};

const getContentByCountryToDB = async (country: string) => {
  const result = await Contents.find({ country }).sort({ createdAt: -1 });
  console.log(result);
  return result;
};

const getContentsToDB = async ({ limit, page }: any) => {
  const result = await Contents.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit)
    .populate('owner', 'name role email image');
  return result;
};

const getContentByIdToDB = async (slug: string) => {
  const result = await Contents.findOne({ slug }).populate(
    'owner',
    'name role email image'
  );
  return result;
};

const getAllContentsToDB = async ({ limit, page }: any) => {
  const result = await Contents.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip((page - 1) * limit)
    .populate('owner', 'name role email image');
  return result;
};

const updateContentToDB = async (id: string, contentData: IContents) => {
  const result = await Contents.findById(id);

  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Content doesn't exist!");
  }

  result.set(contentData);
  result.validateSync();
  const updatedContent = await result.save();
  return updatedContent;
};

const deleteContentToDB = async (id: string) => {
  const result = await Contents.findByIdAndDelete(id);
  return result;
};

// service
const getContentsByUserToDB = async (
  user: string,
  { limit, page }: { limit: number; page: number }
) => {
  // Count total documents for this user
  const total = await Contents.countDocuments({ owner: user });

  // Fetch paginated contents
  const contents = await Contents.find({ owner: user })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean(); // optional: faster if you don't need mongoose docs

  return { contents, total };
};

export const ContentService = {
  createContentToDB,
  getContentByCategoryToDB,
  getContentByCountryToDB,
  getContentsToDB,
  getContentByIdToDB,
  updateContentToDB,
  deleteContentToDB,
  getAllContentsToDB,
  getContentsByUserToDB,
};
