import { Request, Response } from 'express';
import stripe from '../../../util/stripe';
import { DonationModel } from './stripe.model';
import type { Stripe as StripeType } from 'stripe';

const stripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;

  console.log('[Stripe Webhook] ▶ Incoming request to /api/v1/webhook');
  console.log('[Stripe Webhook] Signature header present:', !!signature);

  let event: StripeType.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    console.log(
      '[Stripe Webhook] ✅ Signature verified. Event type:',
      event.type,
    );
  } catch (err) {
    console.error(
      '[Stripe Webhook] ❌ Signature verification failed:',
      (err as Error).message,
    );
    console.error(
      '[Stripe Webhook] Make sure STRIPE_WEBHOOK_SECRET in .env matches the secret shown in your Stripe Dashboard → Webhooks.',
    );
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  const eventType = event.type as string;

  try {
    if (eventType === 'checkout.session.completed') {
      const session = event.data.object as StripeType.Checkout.Session;
      console.log(
        '[Stripe Webhook] Handling checkout.session.completed. Session ID:',
        session.id,
      );
      const result = await DonationModel.findOneAndUpdate(
        { stripeSessionId: session.id },
        { paymentStatus: 'success' },
        { new: true },
      );
      if (result) {
        console.log(
          '[Stripe Webhook] ✅ Status updated to "success" for donation:',
          result._id,
        );
      } else {
        console.warn(
          '[Stripe Webhook] ⚠️ No donation record found for session ID:',
          session.id,
        );
      }
    } else if (eventType === 'checkout.session.expired') {
      const session = event.data.object as StripeType.Checkout.Session;
      console.log(
        '[Stripe Webhook] Handling checkout.session.expired. Session ID:',
        session.id,
      );
      const result = await DonationModel.findOneAndUpdate(
        { stripeSessionId: session.id },
        { paymentStatus: 'cancelled' },
        { new: true },
      );
      if (result) {
        console.log(
          '[Stripe Webhook] ✅ Status updated to "cancelled" for donation:',
          result._id,
        );
      } else {
        console.warn(
          '[Stripe Webhook] ⚠️ No donation record found for session ID:',
          session.id,
        );
      }
    } else if (eventType === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as StripeType.PaymentIntent;
      console.log(
        '[Stripe Webhook] Handling payment_intent.payment_failed. PaymentIntent ID:',
        paymentIntent.id,
      );
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });
      const session = sessions.data[0];
      if (session) {
        const result = await DonationModel.findOneAndUpdate(
          { stripeSessionId: session.id },
          { paymentStatus: 'failed' },
          { new: true },
        );
        if (result) {
          console.log(
            '[Stripe Webhook] ✅ Status updated to "failed" for donation:',
            result._id,
          );
        } else {
          console.warn(
            '[Stripe Webhook] ⚠️ No donation record found for session ID:',
            session.id,
          );
        }
      } else {
        console.warn(
          '[Stripe Webhook] ⚠️ No checkout session found for payment intent:',
          paymentIntent.id,
        );
      }
    } else {
      console.log(
        '[Stripe Webhook] Unhandled event type (ignored):',
        eventType,
      );
    }
  } catch (err) {
    console.error(
      '[Stripe Webhook] ❌ Error processing event:',
      eventType,
      (err as Error).message,
    );
    // Still return 200 so Stripe doesn't keep retrying the same event
  }

  res.json({ received: true });
};

export default stripeWebhook;
