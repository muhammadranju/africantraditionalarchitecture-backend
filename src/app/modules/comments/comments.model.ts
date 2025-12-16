import mongoose from 'mongoose';
import { IComment } from './comments.interface';

const CommentSchema = new mongoose.Schema<IComment>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        default: undefined,
      },
    ],
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contents',
      default: undefined,
    },
    forum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Forum',
      default: undefined,
    },

    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
