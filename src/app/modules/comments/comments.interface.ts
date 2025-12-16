import mongoose from 'mongoose';

export interface IComment {
  owner: mongoose.Types.ObjectId;
  comment: string;
  type: string;
  image?: string;
  content?: mongoose.Types.ObjectId;
  forum?: mongoose.Types.ObjectId;
}
