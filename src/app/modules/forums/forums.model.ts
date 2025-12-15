import mongoose from 'mongoose';
import { CategoryEnum, IForum } from './forums.interface';
import { StatusEnum } from '../contents/contents.interface';
import slugify from 'slugify';
import { nanoid } from 'nanoid';

const ForumSchema = new mongoose.Schema<IForum>(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ForumSchema.pre('save', function (next) {
  this.slug =
    slugify(this.title, {
      lower: true,
      remove: /[*+~]/g,
      strict: true,
    }) +
    '-' +
    nanoid(5).toLowerCase();
  next();
});

const Forum = mongoose.model<IForum>('Forum', ForumSchema);

export default Forum;
