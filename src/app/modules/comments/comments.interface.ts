import mongoose from 'mongoose';

export interface IComment {
  owner: mongoose.Types.ObjectId;
  comment: string;
  type: string;
  image?: string[];
  videos?: string[];
  pdfs?: string[];
  content?: mongoose.Types.ObjectId;
  forum?: mongoose.Types.ObjectId;
  blog?: mongoose.Types.ObjectId;
  likes?: mongoose.Types.ObjectId[];
  replies?: mongoose.Types.ObjectId[];
}
