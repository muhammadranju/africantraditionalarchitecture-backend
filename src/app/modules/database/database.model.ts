import { Schema, model } from 'mongoose';

interface IDatabase {
  name: string;
  email: string;
  country: string;
  about: string;
}

const DatabaseSchema = new Schema<IDatabase>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DatabaseModel = model<IDatabase>('Database', DatabaseSchema);

export default DatabaseModel;
