import { IForum } from './forums.interface';
import Forum from './forums.model';

const createForumToDB = async (forumData: IForum) => {
  const result = await Forum.create(forumData);
  return result;
};

const getAllForumsFromDB = async () => {
  const result = await Forum.find();
  return result;
};

const updateForumToDB = async (id: string, forumData: IForum) => {
  const result = await Forum.findByIdAndUpdate(id, forumData, {
    new: true,
  });
  return result;
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
