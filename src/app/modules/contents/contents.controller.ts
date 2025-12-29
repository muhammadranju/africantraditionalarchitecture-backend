import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContentService } from './contents.service';
import ApiError from '../../../errors/ApiError';
import { TUser } from '../../../types';

const createContent = catchAsync(async (req: Request, res: Response) => {
  const { ...contentData } = req.body;

  const user = req.user;
  const result = await ContentService.createContentToDB(contentData, user);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content created successfully',
    data: result,
  });
});

const getContentByCategory = catchAsync(async (req: Request, res: Response) => {
  const { category } = req.params;
  const result = await ContentService.getContentByCategoryToDB(category);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content fetched successfully',
    data: result,
  });
});

const getContentByCountry = catchAsync(async (req: Request, res: Response) => {
  const { country } = req.params;
  const result = await ContentService.getContentByCountryToDB(country);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content fetched successfully',
    data: result,
  });
});

const getContents = catchAsync(async (req: Request, res: Response) => {
  const { limit, page } = req.query;
  const result = await ContentService.getContentsToDB({ limit, page });
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content fetched successfully',
    data: result,
  });
});

const getAllContents = catchAsync(async (req: Request, res: Response) => {
  const { limit, page } = req.query;
  const result = await ContentService.getAllContentsToDB({ limit, page });
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content fetched successfully',
    data: result,
  });
});

const getContentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContentService.getContentByIdToDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content fetched successfully',
    data: result,
  });
});

const updateContent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContentService.updateContentToDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content updated successfully',
    data: result,
  });
});

const deleteContent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContentService.deleteContentToDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content deleted successfully',
    data: result,
  });
});

// controller
const getContentsByUser = catchAsync(async (req: Request, res: Response) => {
  let limit = parseInt(req.query.limit as string) || 10;
  let page = parseInt(req.query.page as string) || 1;

  // Safety: ensure positive values
  if (page < 1) page = 1;
  if (limit < 1) limit = 10;

  const user = req.user as TUser;
  if (!user || !user.id) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
  }

  const { contents, total } = await ContentService.getContentsByUserToDB(
    user.id,
    {
      limit,
      page,
    }
  );

  const totalPages = Math.ceil(total / limit);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content fetched successfully',
    data: {
      contents,
      pagination: {
        currentPage: page,
        totalPages,
        total,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    },
  });
});
export const ContentController = {
  createContent,
  getContentByCategory,
  getContentByCountry,
  getContents,
  getAllContents,
  getContentById,
  updateContent,
  deleteContent,
  getContentsByUser,
};
