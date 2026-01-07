import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { DatabaseController } from './database.controller';

const router = express.Router();

router.route('/').post(DatabaseController.createDatabase);
router
  .route('/')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    DatabaseController.getDatabase
  );

export const DatabaseRoute = router;
