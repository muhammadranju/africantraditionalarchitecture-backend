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
  if (req.files) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // Handle images
    let images: string[] = [];
    if (files.image)
      images = images.concat(
        files.image.map(file => `/image/${file.filename}`)
      );
    if (files.images)
      images = images.concat(
        files.images.map(file => `/image/${file.filename}`)
      );
    if (images.length > 0) req.body.image = images;

    // Handle PDFs
    let pdfs: string[] = [];
    if (files.pdfs)
      pdfs = pdfs.concat(files.pdfs.map(file => `/doc/${file.filename}`));
    if (files.pdf)
      pdfs = pdfs.concat(files.pdf.map(file => `/doc/${file.filename}`));
    if (files.doc)
      pdfs = pdfs.concat(files.doc.map(file => `/doc/${file.filename}`));
    if (pdfs.length > 0) req.body.pdfs = pdfs;
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

router.route('/:id').get(CommentController.getSingleComment);
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

router
  .route('/like/:id')
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    CommentController.likeComment
  );
// router.route('/reply/:id').post(CommentController.replyComment);

export const CommentRoutes = router;
