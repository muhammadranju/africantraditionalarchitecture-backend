import { IComment } from './comments.interface';
import Comment from './comments.model';

const createCommentToDB = async (commentData: IComment) => {
  const result = await Comment.create(commentData);
  return result;
};

const getAllCommentDB = async () => {
  const result = await Comment.find({}).sort({ createdAt: -1 });
  return result;
};

const getAllCommentContentsDB = async () => {
  const result = await Comment.find({ type: 'contents' })
    .sort({ createdAt: -1 })
    // .populate('content')
    .populate('owner', 'name email image role');
  return result;
};

const getAllCommentForumDB = async () => {
  const result = await Comment.find({ type: 'forum' })
    .sort({ createdAt: -1 })
    // .populate('forum')
    .populate('owner', 'name email image role');
  return result;
};

const updateCommentToDB = async (id: string, commentData: IComment) => {
  const result = await Comment.findByIdAndUpdate(id, commentData, {
    new: true,
  });
  return result;
};

const deleteCommentToDB = async (id: string) => {
  const result = await Comment.findByIdAndDelete(id);
  return result;
};

const getSingleCommentDB = async (id: string) => {
  const result = await Comment.findById(id);
  return result;
};

export const CommentService = {
  createCommentToDB,
  getAllCommentDB,
  getAllCommentContentsDB,
  getAllCommentForumDB,
  updateCommentToDB,
  deleteCommentToDB,
  getSingleCommentDB,
};
