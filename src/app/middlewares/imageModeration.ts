import { Request, Response, NextFunction } from 'express';

import path from 'path';
import { moderateImage } from '../../util/picpurify';

export const checkImagesModeration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) return next();

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const imagesToCheck: string[] = [];

  if (files.coverImage) imagesToCheck.push(files.coverImage[0].path);
  if (files.images) imagesToCheck.push(...files.images.map(f => f.path));

  try {
    for (const imagePath of imagesToCheck) {
      const result = await moderateImage(imagePath);

      // PicPurify result structure: result.task_results.porn.result, etc.
      const pornScore = result.task_results?.porn?.result || 0;
      const drugScore = result.task_results?.drug?.result || 0;
      const goreScore = result.task_results?.gore?.result || 0;

      if (pornScore > 0 || drugScore > 0 || goreScore > 0) {
        return res.status(400).json({
          success: false,
          message: 'Image contains inappropriate content. Upload rejected.',
          details: result.task_results,
        });
      }
    }
    next();
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify image content',
      error: err.message,
    });
  }
};
