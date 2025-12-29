import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import { ForumCategoryController } from './forums-category.controller';

const router = express.Router();

router.route('/').get(ForumCategoryController.getForumCategories);
router.route('/category').get(ForumCategoryController.getForumCategoryOnly);
router.route('/:slug').get(ForumCategoryController.getForumByCategory);
router.route('/').post(
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    console.log('DEBUG: req.files:', req.files);
    console.log('DEBUG: req.body before processing:', req.body);
    if (req.files) {
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      const getRelativePath = (absolutePath: string) => {
        // Normalize the path to forward slashes and ensure it starts with /uploads/
        // Multer stores in process.cwd() + /uploads/...
        // We want the path relative to the project root, e.g., /uploads/image/file.jpg
        const uploadsRoot = path.join(process.cwd(), 'uploads');
        // path.relative gives path from uploadsRoot to file
        let relativePath = path.relative(uploadsRoot, absolutePath);
        // Ensure forward slashes for URL compatibility
        relativePath = relativePath.split(path.sep).join('/');
        // Ensure it starts with /
        if (!relativePath.startsWith('/')) {
          relativePath = '/' + relativePath;
        }
        return relativePath;
      };

      if (files.icon && files.icon[0]) {
        req.body.icon = getRelativePath(files.icon[0].path);
      }
    }
    console.log('DEBUG: req.body after processing:', req.body);
    next();
  },
  ForumCategoryController.createForumCategory
);

export const ForumCategoryRoutes = router;
