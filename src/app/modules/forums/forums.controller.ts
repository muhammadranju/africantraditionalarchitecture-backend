import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ForumService } from './forums.service';
import { Request, Response } from 'express';

const createForum = catchAsync(async (req: Request, res: Response) => {
  const { ...forumData } = req.body;
  const user = req.user;
  const result = await ForumService.createForumToDB(forumData, user);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forum created successfully',
    data: result,
  });
});

const getAllForums = catchAsync(async (req: Request, res: Response) => {
  const { type, ref } = req.query;
  const result = await ForumService.getAllForumsFromDB(
    type as string,
    ref as string
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forums fetched successfully',
    data: result,
  });
});

const getForumById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ForumService.getForumByIdFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forum fetched successfully',
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

const getForumsByUser = catchAsync(async (req: Request, res: Response) => {
  const { limit, page } = req.query;
  const user = req.user;
  const result = await ForumService.getForumsToDB(
    limit as string,
    page as string,
    user as any
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Forums fetched successfully',
    data: result,
  });
});

export const ForumController = {
  createForum,
  getAllForums,
  getForumById,
  updateForum,
  deleteForum,
  getForumsByUser,
};
