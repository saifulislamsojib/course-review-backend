import { Schema } from 'mongoose';

interface TCategory {
  _id: Schema.Types.ObjectId;
  name: string;
}

export default TCategory;
