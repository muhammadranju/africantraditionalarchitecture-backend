import mongoose from 'mongoose';
import { IComment } from './comments.interface';

const CommentSchema = new mongoose.Schema<IComment>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: [
      {
        type: String,
        required: true,
      },
    ],

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
