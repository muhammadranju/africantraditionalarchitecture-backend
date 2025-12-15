import mongoose from 'mongoose';
import { IUserContact } from './user_contacts.interface';

const UserContactSchema = new mongoose.Schema<IUserContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserContact = mongoose.model<IUserContact>(
  'UserContact',
  UserContactSchema
);

export default UserContact;
