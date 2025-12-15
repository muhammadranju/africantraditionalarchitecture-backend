import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import UserContactValidation from './user_contacts.validation';
import { UserContactController } from './user_contacts.controller';

const router = express.Router();

router
  .route('/')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    UserContactController.getAllContent
  )
  .post(
    validateRequest(UserContactValidation.createUserContactZodSchema),
    UserContactController.createContent
  );

router
  .route('/:id')
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    UserContactController.updateContent
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    UserContactController.deleteContent
  );

export const UserContactRoutes = router;
