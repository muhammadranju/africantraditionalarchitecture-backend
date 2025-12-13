import mongoose, { Schema } from 'mongoose';
import { IContents, StatusEnum } from './contents.interface';

const ContentsSchema = new Schema<IContents>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.approved,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contents = mongoose.model<IContents>('Contents', ContentsSchema);

export default Contents;
