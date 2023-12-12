import { Schema } from 'mongoose';

type TCategory = {
  _id: Schema.Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default TCategory;
