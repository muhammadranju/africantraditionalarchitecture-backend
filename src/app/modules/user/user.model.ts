import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import config from '../../../config';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUser, UserModal } from './user.interface';

const userSchema = new Schema<IUser, UserModal>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.provider !== 'google';
      },
    },
    provider: { type: String, required: true, default: 'manual' },

    image: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      default: '',
    },

    website: {
      type: String,
      default: '',
    },
    uploads: [
      {
        type: String,
        default: '',
      },
    ],

    status: {
      type: String,
      enum: ['active', 'delete', 'suspended'],
      default: 'active',
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    verified: {
      type: Boolean,
      default: true,
    },
    authentication: {
      type: {
        isResetPassword: {
          type: Boolean,
          default: false,
        },
        oneTimeCode: {
          type: Number,
          default: null,
        },
        expireAt: {
          type: Date,
          default: null,
        },
      },
      select: 0,
    },
  },
  { timestamps: true }
);

//exist user check
userSchema.statics.isExistUserById = async (id: string) => {
  const isExist = await User.findById(id);
  return isExist;
};

userSchema.statics.isExistUserByEmail = async (email: string) => {
  const isExist = await User.findOne({ email });
  return isExist;
};

//is match password
userSchema.statics.isMatchPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

// Hash password only if it exists
userSchema.pre('save', async function () {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const User = model<IUser, UserModal>('User', userSchema);
