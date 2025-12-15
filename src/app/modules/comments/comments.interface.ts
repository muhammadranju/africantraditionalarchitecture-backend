import mongoose from 'mongoose';

export interface IComment {
  owner: mongoose.Types.ObjectId;
  comment: string[];
  type: string;
}
