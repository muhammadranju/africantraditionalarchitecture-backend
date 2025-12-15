import mongoose from 'mongoose';
import { CategoryEnum } from '../forums/forums.interface';

export enum IRegionEnum {
  east = 'east',
  west = 'west',
  north = 'north',
  south = 'south',
  central = 'central',
  globally = 'globally',
}

// Define the interface for the document (extending Mongoose's Document for full typing)
export interface IContents extends mongoose.Document {
  title: string;
  description: string;
  shortDescription: string;
  owner: mongoose.Types.ObjectId;
  coverImage: string;
  category: CategoryEnum;
  country: string;
  images: string[];
  medias: string[];
  pdfs: string[];
  status: StatusEnum;
  region: IRegionEnum;
  slug: string;
}

export enum StatusEnum {
  flagged = 'flagged',
  approved = 'approved',
}
