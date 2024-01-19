import { ObjectId } from 'mongoose';
import { userRoles } from './user.constant';

export type Role = (typeof userRoles)[number];

export type TPasswordHistory = {
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type TUser = {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  role: Role;
  passwordUpdatedAt?: Date;
  passwordHistories?: TPasswordHistory[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export default TUser;
