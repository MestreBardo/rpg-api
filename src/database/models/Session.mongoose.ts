import { model as Model, Schema } from "mongoose";
import { Session } from "../../common/entities/Session.entity";

class SessionMongoose {

  
  static schema = new Schema<Session>({
    sessionDate: { type: Date, default: new Date() },
    campaign: { type: String, ref: 'Campaign' },
    createdAt: { type: Date, default: new Date() },
    active: { type: Boolean, default: true }


  })

  static model = Model<Session>('Session', SessionMongoose.schema);
}
  
export {
    SessionMongoose
}