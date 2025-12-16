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
  const result = await Contents.find({ category });
  return result;
};

const getContentByCountryToDB = async (country: string) => {
  const result = await Contents.find({ country });
  console.log(result);
  return result;
};

const getContentsToDB = async () => {
  const result = await Contents.find().populate(
    'owner',
    'name role email image'
  );
  return result;
};

const getContentByIdToDB = async (slug: string) => {
  const result = await Contents.findOne({ slug }).populate(
    'owner',
    'name role email image'
  );
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

export const ContentService = {
  createContentToDB,
  getContentByCategoryToDB,
  getContentByCountryToDB,
  getContentsToDB,
  getContentByIdToDB,
  updateContentToDB,
  deleteContentToDB,
};
