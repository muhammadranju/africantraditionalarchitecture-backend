import { Router } from 'express';
import {
  createPaymentLink,
  getDonations,
  verifyPayment,
} from './stripe.controller';

import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = Router();
router.post('/create-payment-link', createPaymentLink);
// Public endpoint — called by the frontend on the success/cancel redirect page
router.get('/verify-payment', verifyPayment);
router.get('/', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), getDonations);

export const paymentRouter = router;
