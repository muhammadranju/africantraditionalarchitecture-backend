import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContentService } from './contents.service';

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
  const result = await ContentService.getContentsToDB();
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

export const ContentController = {
  createContent,
  getContentByCategory,
  getContentByCountry,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
};
