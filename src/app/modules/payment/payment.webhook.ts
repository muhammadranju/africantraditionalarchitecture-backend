import { Request, Response } from 'express';
import stripe from '../../../util/stripe';
import { DonationModel } from './stripe.model';
import type { Stripe as StripeType } from 'stripe';

const stripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;

  let event: StripeType.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  // Use type assertion to bypass strict union checking
  if ((event.type as string) === 'payment_link.completed') {
    // Cast event.data.object to PaymentLink safely
    const link = event.data.object as StripeType.PaymentLink & {
      metadata: Record<string, string>;
    };

    const metadata = link.metadata;

    await DonationModel.findOneAndUpdate(
      { email: metadata.email, stripePaymentLink: link.url },
      { paymentStatus: 'paid' }
    );
  }

  res.json({ received: true });
};

export default stripeWebhook;
