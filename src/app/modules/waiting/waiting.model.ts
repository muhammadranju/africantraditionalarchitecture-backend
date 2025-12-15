import { model, Schema } from 'mongoose';
import {
  IWaitingModal,
  ProfessionalROLES,
  WaitingStatus,
} from './waiting.interface';

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
      enum: Object.values(WaitingStatus),
      default: WaitingStatus.active,
    },
  },
  { timestamps: true }
);

const WaitingList = model<IWaitingModal>('WaitingList', waitingSchema);

export default WaitingList;
