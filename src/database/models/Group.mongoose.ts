import { model as Model, Schema } from "mongoose";
import { Group } from '../../common/entities/Group.entity';

class GroupMongoose {

  
  static schema = new Schema<Group>({
    name: { type: String },
    system: { type: String },
    description: { type: String },
    owner: { type: String, ref: 'User' },
    isPublic: { type: Boolean },
    userCount: { type: Number },
    createdAt: { type: Date }


  })

  static model = Model<Group>('Group', GroupMongoose.schema);
}
  
export {
    GroupMongoose
}