import { model as Model, Schema } from "mongoose";
import { Player } from "../../common/entities/Player.entity";

class PlayerMongoose {

  
  static schema = new Schema<Player>({
    user: { type: String, ref: 'User' },
    campaign: { type: String, ref: 'Campaign' },
    role: { type: String },
    joinedAt: { type: Date, default: new Date() },
    template: { type: {} },


  })

  static model = Model<Player>('Player', PlayerMongoose.schema);
}
  
export {
    PlayerMongoose
}