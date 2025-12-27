import { Router } from 'express';
import { createPaymentLink } from './stripe.controller';

const router = Router();
router.post('/create-payment-link', createPaymentLink);

export const paymentRouter = router;
