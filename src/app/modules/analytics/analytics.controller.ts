import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AnalyticsService } from './analytics.service';

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsService.getDashboardStatsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Dashboard stats fetched successfully',
    data: result,
  });
});

const getUploadsChartData = catchAsync(async (req: Request, res: Response) => {
  const result = await AnalyticsService.getUploadsChartDataFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Uploads chart data fetched successfully',
    data: result,
  });
});

const getActiveUsersChartData = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AnalyticsService.getActiveUsersChartDataFromDB();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Active users chart data fetched successfully',
      data: result,
    });
  }
);

const getUserStats = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await AnalyticsService.getUserStatsFromDB(userId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User dashboard stats fetched successfully',
    data: result,
  });
});

const getUserUploadsChartData = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const result = await AnalyticsService.getUserUploadsChartDataFromDB(userId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User uploads chart data fetched successfully',
      data: result,
    });
  }
);

export const AnalyticsController = {
  getDashboardStats,
  getUploadsChartData,
  getActiveUsersChartData,
  getUserStats,
  getUserUploadsChartData,
};
