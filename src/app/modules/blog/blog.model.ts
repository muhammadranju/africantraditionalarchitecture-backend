import mongoose from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },

    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export const BlogModel = Blog;
