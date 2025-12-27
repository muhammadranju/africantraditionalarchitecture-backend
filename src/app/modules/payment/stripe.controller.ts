import { Request, Response } from 'express';
import { DonationModel } from './stripe.model';
import stripe from '../../../util/stripe';

export const createPaymentLink = async (req: Request, res: Response) => {
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

  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Volunteer Donation', description },
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
      stripePaymentLink: paymentLink.url!,
      paymentStatus: 'paid',
    });

    res.status(200).json({ url: paymentLink.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create payment link' });
  }
};
