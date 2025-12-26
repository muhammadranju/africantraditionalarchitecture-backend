import { Request } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import ApiError from '../../errors/ApiError';

const fileUploadHandler = (customName?: string) => {
  //create upload folder
  const baseUploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(baseUploadDir)) {
    fs.mkdirSync(baseUploadDir);
  }

  //folder create for different file
  const createDir = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
  };

  //create filename
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let uploadDir;
      if (customName) {
        uploadDir = path.join(baseUploadDir, customName);
      } else {
        switch (file.fieldname) {
          case 'image':
          case 'coverImage':
          case 'images':
          case 'icon':
            uploadDir = path.join(baseUploadDir, 'image');
            break;
          case 'media':
          case 'medias':
            uploadDir = path.join(baseUploadDir, 'media');
            break;
          case 'doc':
          case 'pdfs':
            uploadDir = path.join(baseUploadDir, 'doc');
            break;
          case 'type':
            if (
              file.mimetype === 'image/jpeg' ||
              file.mimetype === 'image/png' ||
              file.mimetype === 'image/jpg'
            ) {
              uploadDir = path.join(baseUploadDir, 'image');
            } else if (
              file.mimetype === 'video/mp4' ||
              file.mimetype === 'audio/mpeg'
            ) {
              uploadDir = path.join(baseUploadDir, 'media');
            } else if (file.mimetype === 'application/pdf') {
              uploadDir = path.join(baseUploadDir, 'doc');
            } else {
              throw new ApiError(
                StatusCodes.BAD_REQUEST,
                'File is not supported'
              );
            }
            break;
          default:
            throw new ApiError(
              StatusCodes.BAD_REQUEST,
              'File is not supported'
            );
        }
      }
      createDir(uploadDir);
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, '')
          .toLowerCase()
          .split(' ')
          .join('-') +
        '-' +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  //file filter
  const filterFilter = (req: Request, file: any, cb: FileFilterCallback) => {
    if (
      file.fieldname === 'image' ||
      file.fieldname === 'coverImage' ||
      file.fieldname === 'images' ||
      file.fieldname === 'icon'
    ) {
      if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
      ) {
        cb(null, true);
      } else {
        cb(
          new ApiError(
            StatusCodes.BAD_REQUEST,
            'Only .jpeg, .png, .jpg file supported'
          )
        );
      }
    } else if (file.fieldname === 'media' || file.fieldname === 'medias') {
      if (file.mimetype === 'video/mp4' || file.mimetype === 'audio/mpeg') {
        cb(null, true);
      } else {
        cb(
          new ApiError(
            StatusCodes.BAD_REQUEST,
            'Only .mp4, .mp3, file supported'
          )
        );
      }
    } else if (file.fieldname === 'doc' || file.fieldname === 'pdfs') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new ApiError(StatusCodes.BAD_REQUEST, 'Only pdf supported'));
      }
    } else {
      cb(new ApiError(StatusCodes.BAD_REQUEST, 'This file is not supported'));
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: filterFilter,
  }).fields([
    { name: 'image', maxCount: 3 },
    { name: 'media', maxCount: 3 },
    { name: 'doc', maxCount: 3 },
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
    { name: 'medias', maxCount: 5 },
    { name: 'pdfs', maxCount: 5 },
    { name: 'icon', maxCount: 1 },
  ]);
  return upload;
};

export default fileUploadHandler;
