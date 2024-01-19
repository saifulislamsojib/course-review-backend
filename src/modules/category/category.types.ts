import { ObjectId } from 'mongoose';

type TCategory = {
  _id: ObjectId;
  name: string;
  createdBy: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export default TCategory;
