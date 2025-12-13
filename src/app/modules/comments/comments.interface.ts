import mongoose from 'mongoose';

export interface IComment {
  userId: mongoose.Types.ObjectId;
  comment: string[];
  type: string;
}
