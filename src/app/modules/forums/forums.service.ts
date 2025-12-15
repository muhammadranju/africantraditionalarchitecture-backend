import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IForum } from './forums.interface';
import Forum from './forums.model';

const createForumToDB = async (forumData: IForum, user: any) => {
  const ownerId = user.id;
  const result = new Forum({ ...forumData, owner: ownerId });
  result.validateSync();
  const savedForum = await result.save();
  return savedForum;
};

const getAllForumsFromDB = async () => {
  const result = await Forum.find();
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
};
