import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
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

// const likeCommentToDB = async (id: string, userId: string) => {
//   // const result = await Comment.findByIdAndUpdate(
//   //   id,
//   //   { likes: id },
//   //   { new: true }
//   // );

//   const result = await Comment.findById(id);

//   if (!result) {
//     throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found');
//   }

//   if (result?.likes?.includes(userId as any)) {

//     // result.likes = result.likes.filter(like => like !== (userId as any));

//       result?.likes?.pull(userId as any);

//   } else {
//     result?.likes?.push(userId as any);
//   }

//   await result.save();

//   return result;
// };

const likeCommentToDB = async (id: string, userId: string) => {
  const comment = await Comment.findById(id);

  if (!comment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found');
  }

  const userLiked = comment?.likes?.some(like => like.toString() === userId);

  if (userLiked) {
    // Remove like if user already liked
    comment.likes = comment?.likes?.filter(like => like.toString() !== userId);
  } else {
    // Add like if user hasn't liked
    comment?.likes?.push(userId as any);
  }

  await comment.save();

  return comment;
};

const replyCommentToDB = async (id: string) => {
  const result = await Comment.findByIdAndUpdate(
    id,
    { replies: id },
    { new: true }
  );
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
  likeCommentToDB,
  replyCommentToDB,
};
