import { User } from './../../common/entities/User.entity';

import { model as Model, Schema } from "mongoose";

class UserMongoose {

  
  static schema = new Schema<User>({
    imageUrl: { type: String },
    name: { type: String, lowercase: true },
    surname: { type: String, lowercase: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    username: { type: String, lowercase: true },
    country: { type: String },
    city: { type: String },
    gender: { type: String },
    birthday: { type: Date },
    external: {
      id: { type: String },
      source: { type: String }
    },
    groupCount: { type: Number },
    campaingCount: { type: Number }


  })

  static model = Model<User>('User', UserMongoose.schema);
}
  
export {
  UserMongoose
}