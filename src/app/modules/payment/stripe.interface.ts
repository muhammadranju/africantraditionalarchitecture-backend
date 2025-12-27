import { Document } from 'mongoose';

export interface IDonation extends Document {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;

  volunteerCategory?: string;
  donationCategory?: string;

  amount: number;

  description?: string;

  stripeSessionId?: string;

  paymentStatus?: string;
}

export interface IDonationInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  volunteerCategory: string;
  donationCategory: string;
  description: string;
  amount: number;
  stripeSessionId: string;
  paymentStatus?: string;
}
