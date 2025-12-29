import { Router } from 'express';
import { googleAuthController } from './google.auth.controller';

const router = Router();

router.post('/', googleAuthController);

export const googleRouter = router;
