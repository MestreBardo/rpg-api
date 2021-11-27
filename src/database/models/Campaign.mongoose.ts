import { model as Model, Schema } from "mongoose";
import { Campaign } from "../../common/entities/Campaign.entity";

class CampaignMongoose {

  
  static schema = new Schema<Campaign>({
    name: { type: String },
    group: { type: String, ref: 'Group' },
    system: { type: String },
    description: { type: String },
    master: { type: String, ref: 'User' },
    userCount: { type: Number, defaultq: 0 },
    createdAt: { type: Date, default: new Date() },
    active: { type: Boolean, default: true }


  })

  static model = Model<Campaign>('Campaign', CampaignMongoose.schema);
}
  
export {
  CampaignMongoose
}