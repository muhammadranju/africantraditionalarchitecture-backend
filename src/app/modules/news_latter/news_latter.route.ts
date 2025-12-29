import express from 'express';
import NewsLetterController from './news_latter.controller';

const router = express.Router();

router.route('/').post(NewsLetterController.createNewsLetter);
router.route('/').get(NewsLetterController.getAllNewsLetter);

export const NewsLetterRoutes = router;
