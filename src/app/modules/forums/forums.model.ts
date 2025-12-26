import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import { StatusEnum } from '../contents/contents.interface';
import { IForum } from './forums.interface';

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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ForumCategory',
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
    refSlug: {
      type: String,
      required: true,
    },

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
