import { model, Schema } from 'mongoose';
import { IWaiting, ProfessionalROLES } from './waiting.interface';

interface IWaitingModal extends IWaiting, Document {}

const waitingSchema = new Schema<IWaitingModal>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(ProfessionalROLES),
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    country: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },

    expertise: {
      type: String,
      default: '',
    },
    experience: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'https://i.ibb.co/z5YHLV9/profile.png',
    },

    bio: {
      type: String,
      default: '',
    },

    available: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ['active', 'delete', 'suspended'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export const User = model<IWaitingModal>('User', waitingSchema);
