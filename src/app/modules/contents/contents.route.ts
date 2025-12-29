import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ContentController } from './contents.controller';
import ContentValidation from './contents.validation';

const router = express.Router();

router
  .route('/')
  .get(ContentController.getContents)
  .post(
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      if (req.files) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        const getRelativePath = (absolutePath: string) => {
          const uploadsRoot = path.join(process.cwd(), 'uploads');
          let relativePath = path.relative(uploadsRoot, absolutePath);
          relativePath = relativePath.split(path.sep).join('/');
          // Ensure it starts with /
          if (!relativePath.startsWith('/')) {
            relativePath = '/' + relativePath;
          }
          return relativePath;
        };

        if (files.coverImage && files.coverImage[0]) {
          req.body.coverImage = getRelativePath(files.coverImage[0].path);
        }
        if (files.images && files.images.length > 0) {
          req.body.images = files.images.map(file =>
            getRelativePath(file.path)
          );
        }
        if (files.medias && files.medias.length > 0) {
          req.body.medias = files.medias.map(file =>
            getRelativePath(file.path)
          );
        }
        if (files.pdfs && files.pdfs.length > 0) {
          req.body.pdfs = files.pdfs.map(file => getRelativePath(file.path));
        }
      }
      next();
    },
    validateRequest(ContentValidation.createContentZodSchema),
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    ContentController.createContent
  );

router.route('/all-contents').get(ContentController.getAllContents);

router.route('/category/:category').get(ContentController.getContentByCategory);

router.route('/country/:country').get(ContentController.getContentByCountry);

router
  .route('/users')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    ContentController.getContentsByUser
  );

router
  .route('/:id')
  .get(ContentController.getContentById)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    ContentController.updateContent
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    ContentController.deleteContent
  );

export const ContentRoutes = router;
