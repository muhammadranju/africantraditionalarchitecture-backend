import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import WaitingValidation from './waiting.validation';
import { WaitingListController } from './waiting.controller';

const router = express.Router();

const parseWaitingListData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.available) {
    req.body.available = req.body.available === 'true';
  }

  // Handle file upload from fileUploadHandler (which uses .fields())
  if (req.files) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files.image && files.image[0]) {
      req.body.image = `/waiting-list/${files.image[0].filename}`;
    }
  }

  next();
};

router
  .route('/')
  .get(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    WaitingListController.getAllWaitingList
  );

router.route('/').post(
  fileUploadHandler('waiting-list'),
  parseWaitingListData,
  validateRequest(WaitingValidation.createWaitingZodSchema),

  WaitingListController.createWaitingList
);

router
  .route('/:id')
  .patch(
    fileUploadHandler('waiting-list'),
    parseWaitingListData,
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
    WaitingListController.updateWaitingList
  )
  .delete(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
    WaitingListController.deleteWaitingList
  );

export const WaitingListRoutes = router;
