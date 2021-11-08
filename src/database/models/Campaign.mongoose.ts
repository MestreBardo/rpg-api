import { model as Model, Schema } from "mongoose";

class CampaignMongoose {

  
  static schema = new Schema<Campaign>({
    name: { type: String },
    group: { type: String, ref: 'Group' },
    system: { type: String },
    description: { type: String },
    master: { type: String, ref: 'User' },
    userCount: { type: Number },
    createdAt: { type: Date, default: new Date() },
    active: { type: Boolean, default: true }


  })

  static model = Model<Campaign>('Campaign', CampaignMongoose.schema);
}
  
export {
  CampaignMongoose
}