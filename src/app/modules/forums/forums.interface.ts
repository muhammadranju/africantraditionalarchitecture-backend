import mongoose from 'mongoose';

export interface IForum {
  title: string;
  description: string;
  owner: mongoose.Schema.Types.ObjectId;
  category: string;
  comments: string[];
  status: string;
  slug: string;
}

export enum CategoryEnum {
  cultural = 'cultural',
  rebuilding = 'rebuilding',
  materials = 'materials',
  interactive = 'interactive',
  community = 'community',
}
