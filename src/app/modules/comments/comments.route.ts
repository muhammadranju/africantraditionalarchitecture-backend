import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CommentController } from './comments.controller';
import CommentValidation from './comments.validation';

const router = express.Router();

import { NextFunction, Request, Response } from 'express';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const parseCommentData = (req: Request, res: Response, next: NextFunction) => {
  if (req.files && 'image' in req.files) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.image && files.image.length > 0) {
      req.body.image = files.image.map(file => `/image/${file.filename}`);
    }
  }
  next();
};

router
  .route('/')
  .get(CommentController.getAllComment)
  .post(
    fileUploadHandler(),
    parseCommentData,
    validateRequest(CommentValidation.createCommentZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    CommentController.createComment
  );
router.route('/contents').get(CommentController.getAllCommentByContents);
router.route('/forum').get(CommentController.getAllCommentByForum);

router
  .route('/:id')
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    CommentController.updateComment
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    CommentController.deleteComment
  );

export const CommentRoutes = router;
