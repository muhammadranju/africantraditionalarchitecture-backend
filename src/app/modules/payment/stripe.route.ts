import { Router } from 'express';
import { createPaymentLink, getDonations } from './stripe.controller';

import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = Router();
router.post('/create-payment-link', createPaymentLink);
router.get('/', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), getDonations);

export const paymentRouter = router;
