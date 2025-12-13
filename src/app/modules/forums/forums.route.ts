import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import ForumValidation from './forums.validation';

const router = express.Router();

router
  .route('/')
  .get()
  .post(
    validateRequest(ForumValidation.createForumZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER)
  );

router
  .route('/:id')
  .patch(
    validateRequest(ForumValidation.createForumZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER)
  )
  .delete(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER));

export const ForumRoutes = router;
