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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,

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
      success_url: `${process.env.FRONTEND_URL}/donate/thank-you`,
      cancel_url: `${process.env.FRONTEND_URL}/donate/error`,
    });

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
      paymentStatus: 'paid',
    });

    res.status(200).json({
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Payment link created successfully',
      url: session.url,
    });
  }
);

export const getDonations = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const donations = await DonationModel.find()
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Donations fetched successfully',
    data: {
      donations,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: await DonationModel.countDocuments(),
      },
    },
  });
});
