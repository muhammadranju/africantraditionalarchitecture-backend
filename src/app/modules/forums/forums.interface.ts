/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

export interface IForum {
  _id: string;
  title: string;
  description: string;
  owner: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  comments: string[];
  status: string;
  slug: string;
  type: string;
  refSlug: string;
  stats: {
    posts: [];
    views: number;
  };
}

export enum CategoryEnum {
  introduction = 'introduction',
  cultural = 'cultural',
  rebuilding = 'rebuilding',
  materials = 'materials',
  interactive = 'interactive',
  community = 'community',
}
