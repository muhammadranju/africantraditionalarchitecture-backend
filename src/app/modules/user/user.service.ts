import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import unlinkFile from '../../../shared/unlinkFile';
import { ActiveUserModal } from './active_users.model';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserToDB = async (payload: Partial<IUser>): Promise<IUser> => {
  //set role
  payload.role = USER_ROLES.USER;
  const createUser = await User.create(payload);
  if (!createUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
  }

  return createUser;
};

const getUserProfileFromDB = async (
  user: JwtPayload
): Promise<Partial<IUser>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return isExistUser;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //unlink file here
  if (payload.image) {
    unlinkFile(isExistUser.image);
  }

  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

const getAllUsersFromDB = async (): Promise<IUser[]> => {
  const result = await User.find().sort({ createdAt: -1 });
  return result;
};

const updateStatusToDB = async (
  id: string,
  status: string
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(
    id,
    { status: status },
    { new: true }
  );
  return result;
};

const deleteUserToDB = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const totalActiveUserFromDB = async (
  user: any,
  ip: string,
  device: string,
  browser: string,
  os: string
) => {
  const findUserIp = await ActiveUserModal.findOne({ ip });

  if (findUserIp) {
    await ActiveUserModal.findOneAndUpdate(
      { ip },
      { $set: { lastActive: new Date(), views: findUserIp.views + 1 } }
    );
  } else {
    await ActiveUserModal.create({
      ip,
      device,
      browser,
      os,
      lastActive: new Date(),
      user: user?.email || 'Guest',
    });
  }

  return;
};

const totalActiveUserToDB = async () => {
  const result = await ActiveUserModal.find().sort({ createdAt: -1 });
  return result;
};

const getMonthlyActiveUsersFromDB = async (year: number) => {
  const rawResult = await ActiveUserModal.aggregate([
    {
      $match: {
        lastActive: {
          $gte: new Date(`${year}-01-01T00:00:00.000Z`),
          $lte: new Date(`${year}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$lastActive' },
        totalUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill months with 0 if no data
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const result = months.map(month => {
    const monthData = rawResult.find(r => r._id === month);
    return {
      month,
      totalUsers: monthData ? monthData.totalUsers : 0,
    };
  });

  return result;
};

const getActiveUsersByMonthFromDB = async (year: number, month: number) => {
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1));

  const result = await ActiveUserModal.countDocuments({
    lastActive: { $gte: start, $lt: end },
  });

  return result; // will return 0 if no document, not null
};

export const UserService = {
  createUserToDB,
  getUserProfileFromDB,
  updateProfileToDB,
  getAllUsersFromDB,
  updateStatusToDB,
  deleteUserToDB,
  totalActiveUserFromDB,
  totalActiveUserToDB,
  getMonthlyActiveUsersFromDB,
  getActiveUsersByMonthFromDB,
};
