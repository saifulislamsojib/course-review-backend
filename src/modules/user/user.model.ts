import { Schema, model } from 'mongoose';
import { hashPassword } from '../auth/auth.utils';
import { userRoles } from './user.constant';
import TUser, { TPasswordHistory } from './user.types';

const passwordHistory = new Schema<TPasswordHistory>(
  {
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: 0,
    },
    role: {
      type: String,
      enum: userRoles,
      default: userRoles[0],
      trim: true,
    },
    passwordHistories: {
      type: [passwordHistory],
      default: undefined,
      select: 0,
    },
    passwordUpdatedAt: {
      type: Date,
      default: undefined,
      select: 0,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function preUserSave() {
  this.password = await hashPassword(this.password);
});

const User = model<TUser>('User', userSchema);

export default User;
