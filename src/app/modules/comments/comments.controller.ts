import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CommentService } from './comments.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createComment = catchAsync(async (req: Request, res: Response) => {
  const { ...commentData } = req.body;
  const owner = req.user as any;
  commentData.owner = owner.id;

  const result = await CommentService.createCommentToDB(commentData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Comment created successfully',
    data: result,
  });
});

const getAllComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getAllCommentDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comment fetched successfully',
    data: result,
  });
});
const getAllCommentByContents = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentService.getAllCommentContentsDB();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Comment fetched successfully',
      data: result,
    });
  }
);
const getAllCommentByForum = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getAllCommentForumDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comment fetched successfully',
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...commentData } = req.body;
  const result = await CommentService.updateCommentToDB(id, commentData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comment updated successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CommentService.deleteCommentToDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comment deleted successfully',
    data: result,
  });
});

const getSingleComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CommentService.getSingleCommentDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comment fetched successfully',
    data: result,
  });
});

export const CommentController = {
  createComment,
  getAllComment,
  getAllCommentByContents,
  getAllCommentByForum,
  updateComment,
  deleteComment,
  getSingleComment,
};
