import { Router } from 'express';
import { googleAuth } from './google.auth.controller';

const router = Router();

router.post('/', googleAuth);

export const googleRouter = router;
