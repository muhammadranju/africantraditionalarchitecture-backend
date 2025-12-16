import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import ForumValidation from './forums.validation';
import { ForumController } from './forums.controller';

const router = express.Router();

router
  .route('/')
  .get(ForumController.getAllForums)
  .post(
    validateRequest(ForumValidation.createForumZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    ForumController.createForum
  );

router
  .route('/:id')
  .get(ForumController.getForumById)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    ForumController.updateForum
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    ForumController.deleteForum
  );

export const ForumRoutes = router;
