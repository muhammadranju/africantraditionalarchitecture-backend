import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...userData } = req.body;
    const result = await UserService.createUserToDB(userData);
    console.log('result', result);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User created successfully',
      data: result,
    });
  }
);

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserProfileFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

//update profile
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let image = getSingleFilePath(req.files, 'image');

    const data = {
      image,
      ...req.body,
    };
    const result = await UserService.updateProfileToDB(user, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await UserService.updateStatusToDB(id, status);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User status updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUserToDB(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

const totalActiveUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { ip, device, browser, os } = req.body;
  const result = await UserService.totalActiveUserFromDB(
    user,
    ip,
    device,
    browser,
    os
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getMonthlyActiveUsers = catchAsync(
  async (req: Request, res: Response) => {
    const year = Number(req.query.year) || new Date().getFullYear();
    const result = await UserService.getMonthlyActiveUsersFromDB(year);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Monthly active users fetched successfully',
      data: result,
    });
  }
);

const getActiveUsersByMonth = catchAsync(
  async (req: Request, res: Response) => {
    const year = Number(req.query.year) || new Date().getFullYear();
    const month = Number(req.query.month) || new Date().getMonth() + 1;

    const result = await UserService.getActiveUsersByMonthFromDB(year, month);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Active users by month fetched successfully',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
  getUserProfile,
  updateProfile,
  getAllUsers,
  updateStatus,
  deleteUser,
  totalActiveUser,
  getMonthlyActiveUsers,
  getActiveUsersByMonth,
};
