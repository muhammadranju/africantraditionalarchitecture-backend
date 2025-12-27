import Contents from '../contents/contents.model';
import Forum from '../forums/forums.model';
import { ActiveUserModal } from '../user/active_users.model';
import { User } from '../user/user.model';

const getDashboardStatsFromDB = async () => {
  const totalUsers = await User.countDocuments();
  const totalUploads = await Contents.countDocuments();
  const totalForums = await Forum.countDocuments();

  // Active users in the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const activeUsers30d = await ActiveUserModal.countDocuments({
    lastActive: { $gte: thirtyDaysAgo },
  });

  return {
    totalUsers,
    totalUploads,
    totalForums,
    activeUsers30d,
  };
};

const getUploadsChartDataFromDB = async () => {
  const year = new Date().getFullYear();
  const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
  const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

  const rawResult = await Contents.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfYear,
          $lte: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalUploads: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill months with 0 if no data
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const result = months.map((monthName, index) => {
    const monthIndex = index + 1;
    const monthData = rawResult.find(
      (r: { _id: number; totalUploads: number }) => r._id === monthIndex
    );
    return {
      month: monthName,
      uploads: monthData ? monthData.totalUploads : 0,
    };
  });

  return result;
};

const getActiveUsersChartDataFromDB = async () => {
  const year = new Date().getFullYear();
  const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
  const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

  const rawResult = await ActiveUserModal.aggregate([
    {
      $match: {
        lastActive: {
          $gte: startOfYear,
          $lte: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: { $month: '$lastActive' },
        totalActiveUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill months with 0 if no data
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const result = months.map((monthName, index) => {
    const monthIndex = index + 1;
    const monthData = rawResult.find(
      (r: { _id: number; totalActiveUsers: number }) => r._id === monthIndex
    );
    return {
      month: monthName,
      activeUsers: monthData ? monthData.totalActiveUsers : 0,
    };
  });

  return result;
};

const getUserStatsFromDB = async (userId: string) => {
  const totalUploads = await Contents.countDocuments({ owner: userId });
  const totalForums = await Forum.countDocuments({ owner: userId });

  return {
    totalUploads,
    totalForums,
  };
};

const getUserUploadsChartDataFromDB = async (userId: string) => {
  const year = new Date().getFullYear();
  const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
  const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

  const { Types } = await import('mongoose');
  const userObjectId = new Types.ObjectId(userId);

  const rawResult = await Contents.aggregate([
    {
      $match: {
        owner: userObjectId,
        createdAt: {
          $gte: startOfYear,
          $lte: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalUploads: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill months with 0 if no data
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const result = months.map((monthName, index) => {
    const monthIndex = index + 1;
    const monthData = rawResult.find(
      (r: { _id: number; totalUploads: number }) => r._id === monthIndex
    );
    return {
      month: monthName,
      uploads: monthData ? monthData.totalUploads : 0,
    };
  });

  return result;
};

export const AnalyticsService = {
  getDashboardStatsFromDB,
  getUploadsChartDataFromDB,
  getActiveUsersChartDataFromDB,
  getUserStatsFromDB,
  getUserUploadsChartDataFromDB,
};
