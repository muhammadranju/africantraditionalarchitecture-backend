import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import UserContactValidation from './user_contacts.validation';

const router = express.Router();

router
  .route('/')
  .get(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER))
  .post(
    validateRequest(UserContactValidation.createUserContactZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER)
  );

router
  .route('/:id')
  .patch(
    validateRequest(UserContactValidation.createUserContactZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER)
  )
  .delete(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER));

export const UserContactRoutes = router;
