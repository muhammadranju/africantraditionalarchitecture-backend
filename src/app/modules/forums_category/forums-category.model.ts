import mongoose from 'mongoose';
import { IForumCategory } from './forums-category.interface';

const ForumCategorySchema = new mongoose.Schema<IForumCategory>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
    },

    type: {
      type: String,
      required: true,
    },

    posts: [
      {
        type: String,
        default: null,
      },
    ],

    views: {
      type: Number,
      default: 0,
    },

    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ForumCategory = mongoose.model<IForumCategory>(
  'ForumCategory',
  ForumCategorySchema
);

export default ForumCategory;
