import express, { NextFunction, Request, Response } from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

import { USER_ROLES } from '../../../enums/user';
import blogValidation from './blog.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(BlogController.getAllBlog)
  .post(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler('blog'),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      const files = (req as any).files;
      if (files?.image?.length) {
        req.body.image = `/blog/${files.image[0].filename}`;
      }

      next();
    },
    validateRequest(blogValidation.createBlogZodSchema),
    BlogController.createBlog
  );
router
  .route('/:id')
  .get(BlogController.getSingleBlog)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    fileUploadHandler('blog'),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      const files = (req as any).files;
      if (files?.image?.length) {
        req.body.image = `/blog/${files.image[0].filename}`;
      }

      next();
    },
    BlogController.updateBlog
  )
  .delete(BlogController.deleteBlog);

export const BlogRoutes = router;
