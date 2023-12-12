import { Schema } from 'mongoose';

type TCategory = {
  _id: Schema.Types.ObjectId;
  name: string;
};

export default TCategory;
