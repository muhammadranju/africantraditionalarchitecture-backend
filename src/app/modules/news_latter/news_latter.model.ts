import { Schema, model } from 'mongoose';

const NewsLetterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const NewsLetterModel = model('NewsLetter', NewsLetterSchema);
