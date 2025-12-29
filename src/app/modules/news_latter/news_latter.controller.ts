import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import NewsLetterService from './news_latter.service';

const createNewsLetter = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await NewsLetterService.createNewsLetterToDB(email);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'News letter created successfully',
    data: result,
  });
});

const getAllNewsLetter = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsLetterService.getAllNewsLetterToDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'News letter fetched successfully',
    data: result,
  });
});

const NewsLetterController = {
  createNewsLetter,
  getAllNewsLetter,
};

export default NewsLetterController;
