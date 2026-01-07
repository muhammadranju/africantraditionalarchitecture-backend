import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { DatabaseService } from './database.service';

const createDatabase = catchAsync(async (req: Request, res: Response) => {
  const { ...databaseData } = req.body;

  const result = await DatabaseService.createContentToDB(databaseData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Content created successfully',
    data: result,
  });
});

const getDatabase = catchAsync(async (req: Request, res: Response) => {
  const { limit, page } = req.query;
  let limitNumber = parseInt(limit as string);
  let pageNumber = parseInt(page as string);
  const result = await DatabaseService.getContentsToDB({
    limitNumber,
    pageNumber,
  });
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Database fetched successfully',
    data: {
      result,
      pagination: {
        currentPage: pageNumber,
        limit: limitNumber,
      },
    },
  });
});

export const DatabaseController = {
  createDatabase,
  getDatabase,
};
