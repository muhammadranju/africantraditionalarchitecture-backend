import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { AnalyticsController } from './analytics.controller';

const router = express.Router();

router.get(
  '/dashboard-stats',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  AnalyticsController.getDashboardStats
);

router.get(
  '/uploads-chart',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  AnalyticsController.getUploadsChartData
);

router.get(
  '/active-users-chart',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  AnalyticsController.getActiveUsersChartData
);

router.get(
  '/user-dashboard-stats',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  AnalyticsController.getUserStats
);

router.get(
  '/user-uploads-chart',
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
  AnalyticsController.getUserUploadsChartData
);

export const AnalyticsRoutes = router;
