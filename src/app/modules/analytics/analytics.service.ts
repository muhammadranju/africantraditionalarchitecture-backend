import Contents from '../contents/contents.model';
import Forum from '../forums/forums.model';
import { User } from '../user/user.model';
import Comment from '../comments/comments.model';

const getDashboardStatsFromDB = async () => {
  const totalUsers = await User.countDocuments();
  const totalUploads = await Contents.countDocuments();
  const totalForums = await Forum.countDocuments();

  // Active users in the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const activeUsers30d = await User.countDocuments({
    isActive: true,
    updatedAt: { $gte: thirtyDaysAgo },
  });

  return {
    totalUsers,
    totalUploads,
    totalForums,
    activeUsers30d,
  };
};

const getUploadsChartDataFromDB = async () => {
  const now = new Date();
  const year = now.getFullYear();
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

  // Current month total
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  const currentMonthTotal = await Contents.countDocuments({
    createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
  });

  // Previous month total
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  );
  const previousMonthTotal = await Contents.countDocuments({
    createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
  });

  // Group months into 2-month intervals
  const groups = [
    { name: 'Jan-Feb', months: [1, 2] },
    { name: 'Mar-Apr', months: [3, 4] },
    { name: 'May-Jun', months: [5, 6] },
    { name: 'Jul-Aug', months: [7, 8] },
    { name: 'Sep-Oct', months: [9, 10] },
    { name: 'Nov-Dec', months: [11, 12] },
  ];

  const chartData = groups.map(group => {
    const groupUploads = rawResult
      .filter((r: { _id: number; totalUploads: number }) =>
        group.months.includes(r._id)
      )
      .reduce(
        (sum: number, r: { totalUploads: number }) => sum + r.totalUploads,
        0
      );
    return {
      month: group.name,
      uploads: groupUploads,
    };
  });

  return {
    chartData,
    currentMonthTotal,
    previousMonthTotal,
  };
};

const getActiveUsersChartDataFromDB = async () => {
  const year = new Date().getFullYear();
  const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
  const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

  const rawResult = await User.aggregate([
    {
      $match: {
        isActive: true,
        updatedAt: {
          $gte: startOfYear,
          $lte: endOfYear,
        },
      },
    },
    {
      $group: {
        _id: { $month: '$updatedAt' },
        totalActiveUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Group months into 2-month intervals
  const groups = [
    { name: 'Jan-Feb', months: [1, 2] },
    { name: 'Mar-Apr', months: [3, 4] },
    { name: 'May-Jun', months: [5, 6] },
    { name: 'Jul-Aug', months: [7, 8] },
    { name: 'Sep-Oct', months: [9, 10] },
    { name: 'Nov-Dec', months: [11, 12] },
  ];

  const result = groups.map(group => {
    const groupActiveUsers = rawResult
      .filter((r: { _id: number; totalActiveUsers: number }) =>
        group.months.includes(r._id)
      )
      .reduce(
        (sum: number, r: { totalActiveUsers: number }) =>
          sum + r.totalActiveUsers,
        0
      );
    return {
      month: group.name,
      activeUsers: groupActiveUsers,
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
  const now = new Date();
  const year = now.getFullYear();
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

  // Current month total for user
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  const currentMonthTotal = await Contents.countDocuments({
    owner: userId,
    createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
  });

  const totalUploads = await Contents.countDocuments({ owner: userId });

  // Previous month total for user
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  );
  const previousMonthTotal = await Contents.countDocuments({
    owner: userId,
    createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
  });

  // Group months into 2-month intervals
  const groups = [
    { name: 'Jan', months: [1] },
    { name: 'Feb', months: [2] },
    { name: 'Mar', months: [3] },
    { name: 'Apr', months: [4] },
    { name: 'May', months: [5] },
    { name: 'Jun', months: [6] },
    { name: 'Jul', months: [7] },
    { name: 'Aug', months: [8] },
    { name: 'Sep', months: [9] },
    { name: 'Oct', months: [10] },
    { name: 'Nov', months: [11] },
    { name: 'Dec', months: [12] },
  ];

  const chartData = groups.map(group => {
    const groupUploads = rawResult
      .filter((r: { _id: number; totalUploads: number }) =>
        group.months.includes(r._id)
      )
      .reduce(
        (sum: number, r: { totalUploads: number }) => sum + r.totalUploads,
        0
      );
    return {
      month: group.name,
      uploads: groupUploads,
    };
  });

  return {
    chartData,
    currentMonthTotal,
    previousMonthTotal,
    totalUploads,
  };
};

const getCommunityStatsFromDB = async () => {
  const discussions = await Forum.countDocuments();
  const topics = await Comment.countDocuments();
  const posts = await Contents.countDocuments();
  const members = await User.countDocuments();

  // Online (Active users in the last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const online = await User.countDocuments({
    isActive: true,
    updatedAt: { $gte: thirtyDaysAgo },
  });

  return {
    discussions,
    topics,
    posts,
    online,
    members,
  };
};

export const AnalyticsService = {
  getDashboardStatsFromDB,
  getUploadsChartDataFromDB,
  getActiveUsersChartDataFromDB,
  getUserStatsFromDB,
  getUserUploadsChartDataFromDB,
  getCommunityStatsFromDB,
};
