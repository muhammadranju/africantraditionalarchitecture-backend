import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { WaitingListService } from './waiting.service';

const createWaitingList = catchAsync(async (req: Request, res: Response) => {
  const { ...waitingListData } = req.body;
  const result = await WaitingListService.createWaitingListToDB(
    waitingListData
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Waiting List created successfully',
    data: result,
  });
});

const getAllWaitingList = catchAsync(async (req: Request, res: Response) => {
  const result = await WaitingListService.getAllWaitingListFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Waiting List fetched successfully',
    data: result,
  });
});

const updateWaitingList = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...waitingListData } = req.body;
  const result = await WaitingListService.updateWaitingListToDB(
    id,
    waitingListData
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Waiting List updated successfully',
    data: result,
  });
});

const deleteWaitingList = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WaitingListService.deleteWaitingListToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Waiting List deleted successfully',
    data: result,
  });
});

export const WaitingListController = {
  createWaitingList,
  getAllWaitingList,
  updateWaitingList,
  deleteWaitingList,
};
