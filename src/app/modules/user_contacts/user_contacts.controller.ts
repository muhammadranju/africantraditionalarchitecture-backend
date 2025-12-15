import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { UserContactService } from './user_contacts.service';

const createContent = catchAsync(async (req: Request, res: Response) => {
  const { ...contactData } = req.body;
  const result = await UserContactService.createContentToDB(contactData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User Contact created successfully',
    data: result,
  });
});

const getAllContent = catchAsync(async (req: Request, res: Response) => {
  const result = await UserContactService.getAllContentFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User Contact fetched successfully',
    data: result,
  });
});

const updateContent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...contactData } = req.body;
  const result = await UserContactService.updateContentToDB(id, contactData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User Contact updated successfully',
    data: result,
  });
});

const deleteContent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserContactService.deleteContentToDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User Contact deleted successfully',
    data: result,
  });
});

export const UserContactController = {
  createContent,
  getAllContent,
  updateContent,
  deleteContent,
};
