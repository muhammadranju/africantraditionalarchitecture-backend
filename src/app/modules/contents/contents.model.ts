import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import { IContents, IRegionEnum, StatusEnum } from './contents.interface';

const ContentsSchema = new Schema<IContents>(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      maxLength: 100,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      enum: Object.values(IRegionEnum),

      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    medias: [
      {
        type: String,
      },
    ],
    pdfs: [
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

    stepByStep: [
      {
        title: {
          type: String,
          default: null,
        },
        value: {
          type: [String],
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

ContentsSchema.pre('save', async function (next) {
  this.slug = slugify(this.title.toLowerCase() + '-' + nanoid(5), {
    lower: true,
    locale: 'en',
    remove: /[*+~.,()]/g,
    strict: true,
  });
  next();
});

const Contents = mongoose.model<IContents>('Contents', ContentsSchema);

export default Contents;
