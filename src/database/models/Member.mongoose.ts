import { model as Model, Schema } from "mongoose";
import { Member } from "../../common/entities/Member.entity";

class MemberMongoose {

  
  static schema = new Schema<Member>({
    user: { type: String, ref: 'User' },
    group: { type: String, ref: 'Group' },
    role: { type: String },
    joinedAt: { type: Date }


  })

  static model = Model<Member>('Member', MemberMongoose.schema);
}
  
export {
    MemberMongoose
}