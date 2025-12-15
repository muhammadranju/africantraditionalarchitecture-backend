import mongoose from 'mongoose';
import { CategoryEnum, IForum } from './forums.interface';
import { StatusEnum } from '../contents/contents.interface';

const ForumSchema = new mongoose.Schema<IForum>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(CategoryEnum),
      required: true,
    },
    comments: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.approved,
    },
  },
  {
    timestamps: true,
  }
);

const Forum = mongoose.model<IForum>('Forum', ForumSchema);

export default Forum;
