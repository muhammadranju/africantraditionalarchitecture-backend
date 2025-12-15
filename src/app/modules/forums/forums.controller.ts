import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ForumService } from './forums.service';
import { Request, Response } from 'express';

const createForum = catchAsync(async (req: Request, res: Response) => {
  const { ...forumData } = req.body;
  const result = await ForumService.createForumToDB(forumData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forum created successfully',
    data: result,
  });
});

const getAllForums = catchAsync(async (req: Request, res: Response) => {
  const result = await ForumService.getAllForumsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forums fetched successfully',
    data: result,
  });
});

const updateForum = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...forumData } = req.body;
  const result = await ForumService.updateForumToDB(id, forumData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forum updated successfully',
    data: result,
  });
});

const deleteForum = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ForumService.deleteForumToDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forum deleted successfully',
    data: result,
  });
});

export const ForumController = {
  createForum,
  getAllForums,
  updateForum,
  deleteForum,
};
