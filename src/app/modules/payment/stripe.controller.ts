import { Request, Response } from 'express';
import { DonationModel } from './stripe.model';
import stripe from '../../../util/stripe';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';

export const createPaymentLink = catchAsync(
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      volunteerCategory,
      donationCategory,
      description,
      amount,
    } = req.body;

    // Create a Stripe customer so the checkout form auto-fills email + cardholder name
    const customer = await stripe.customers.create({
      name: `${firstName} ${lastName}`,
      email,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer: customer.id,

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: volunteerCategory,
              description: description,
              images: [
                'https://www.africantraditionalarchitecture.com/bg/Rectangle6.jpg',
              ],
            },
            unit_amount: Math.floor(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        firstName,
        lastName,
        email,
        phoneNumber,
        country,
        volunteerCategory,
        donationCategory,
        description,
      },
      // Append {CHECKOUT_SESSION_ID} — Stripe replaces this template variable automatically.
      // The frontend can then read ?sessionId= and call /verify-payment to sync the status.
      success_url: `${process.env.FRONTEND_URL}/donate/thank-you?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/donate/error?sessionId={CHECKOUT_SESSION_ID}`,
    });

    // Always start as 'pending'. The webhook (and/or verifyPayment) will
    // update it to 'success', 'failed', or 'cancelled' based on the real result.
    await DonationModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      volunteerCategory,
      donationCategory,
      description,
      amount,
      stripeSessionId: session.id,
      // paymentStatus: 'pending',
    });

    res.status(200).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Payment link created successfully',
      url: session.url,
    });
  },
);

/**
 * GET /api/v1/donation/verify-payment?sessionId=cs_xxx
 *
 * The frontend calls this after Stripe redirects to success_url or cancel_url.
 * It fetches the real session status directly from Stripe and syncs the DB.
 * This is the reliable fallback when the webhook hasn't fired yet.
 */
export const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { sessionId } = req.query;

  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'sessionId query parameter is required',
    });
  }

  console.log('[verifyPayment] Verifying session:', sessionId);

  // Ask Stripe for the ground truth
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  console.log(
    '[verifyPayment] Stripe payment_status:',
    session.payment_status,
    '| status:',
    session.status,
  );

  let paymentStatus: 'pending' | 'success' | 'failed' | 'cancelled';

  if (session.payment_status === 'paid') {
    paymentStatus = 'success';
  } else if (session.status === 'expired') {
    paymentStatus = 'cancelled';
  } else if (session.status === 'open') {
    // Checkout still open — user hasn't finished yet
    paymentStatus = 'pending';
  } else {
    paymentStatus = 'failed';
  }

  const donation = await DonationModel.findOneAndUpdate(
    { stripeSessionId: sessionId },
    { paymentStatus },
    { new: true },
  );

  if (!donation) {
    console.warn(
      '[verifyPayment] No donation record found for session:',
      sessionId,
    );
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Donation record not found for this session',
    });
  }

  console.log(
    '[verifyPayment] ✅ Updated donation',
    donation._id,
    '→',
    paymentStatus,
  );

  const isSuccess = paymentStatus === 'success';

  let message = 'Payment status verified';
  if (paymentStatus === 'pending') {
    message =
      'Your payment is still pending. If you just completed it, please wait a moment and refresh.';
  } else if (paymentStatus === 'cancelled') {
    message = 'Payment was cancelled or the session expired.';
  } else if (paymentStatus === 'failed') {
    message = 'Payment failed. Please try again with a different card.';
  }

  sendResponse(res, {
    success: isSuccess,
    statusCode: isSuccess ? StatusCodes.OK : StatusCodes.PAYMENT_REQUIRED,
    message,
    data: {
      paymentStatus: donation.paymentStatus,
      donationId: donation._id,
    },
  });
});

export const getDonations = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10, status } = req.query;

  // If ?status=success (or pending/failed/cancelled) is passed, filter by it.
  // Without a filter, admins see all records so they can review pending/failed ones.
  const filter = status ? { paymentStatus: status as string } : {};

  const [donations, total, successCount] = await Promise.all([
    DonationModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit)),
    DonationModel.countDocuments(filter),
    // successCount is always the confirmed-payment total, regardless of the filter,
    // so the dashboard revenue figure is always accurate.
    DonationModel.countDocuments({ paymentStatus: 'success' }),
  ]);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Donations fetched successfully',
    data: {
      donations,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
      },
      successCount,
    },
  });
});

export const deleteDonation = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'id query parameter is required',
      });
    }

    const donation = await DonationModel.findOneAndDelete({ _id: id });

    if (!donation) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Donation record not found',
      });
    }

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Donation deleted successfully',
      data: {
        donationId: donation._id,
      },
    });
  },
);
