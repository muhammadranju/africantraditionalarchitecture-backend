import mongoose, { Schema } from 'mongoose';
import { IDonation } from './stripe.interface';
const donationSchema = new Schema<IDonation>(
  {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    country: String,
    volunteerCategory: String,
    donationCategory: String,
    amount: { type: Number, required: true },
    description: String,
    stripeSessionId: String,
    paymentStatus: { type: String, default: 'paid' },
  },
  { timestamps: true }
);

export const DonationModel = mongoose.model<IDonation>(
  'Donation',
  donationSchema
);
