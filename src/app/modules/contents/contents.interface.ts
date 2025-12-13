import mongoose from 'mongoose';

// Define the interface for the document (extending Mongoose's Document for full typing)
export interface IContents extends Document {
  title: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  coverImage: string;
  image?: string; // optional field
  category: string;
  type: string;
  status: StatusEnum;
}

export enum StatusEnum {
  flagged = 'flagged',
  approved = 'approved',
}
