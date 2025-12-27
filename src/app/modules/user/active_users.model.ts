import { model, Schema } from 'mongoose';

const activeUsersSchema = new Schema({
  ip: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  lastActive: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const ActiveUser = model('ActiveUser', activeUsersSchema);

export const ActiveUserModal = ActiveUser;
