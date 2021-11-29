import { CampaignMongoose } from "../models/Campaign.mongoose"
import { SessionMongoose } from "../models/Session.mongoose";

class SessionRepository {
    static async addPlayer(campaignId: string) {
        const campaign = await CampaignMongoose.model.findById(
            campaignId
        );
        campaign.userCount++;

        await campaign.save();

        return campaign.toJSON();
    }

    static async findByDate(date: Date, campaignId: string): Promise<any> { 
        const session = await SessionMongoose.model.findOne({
            campaign: campaignId,
            sessionDate: date
        })
        .lean();
        console.log(session)
        return session;
    }

    static async create(receivedSession: any): Promise<any> {
        const session = new SessionMongoose.model(receivedSession);
        await session.save();
        return session.toJSON();
    };

    static async updateName(campaignId: string, name: string): Promise<any> {
        const updatedGroup = await CampaignMongoose.model.findByIdAndUpdate(
            campaignId,
            {
                $set: {
                    name
                }
            },
            {
                new: true
            }
        )
        .populate('master', '_id username')
        .lean();
        return updatedGroup;
    }

    static async updateOne(id: string, campaignUpdate: any): Promise<any> {
        Object.keys(campaignUpdate).forEach(
            key => {
                if (!campaignUpdate[key])
                    delete campaignUpdate[key];
            }
        )
        const updatedGroup = await CampaignMongoose.model.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...campaignUpdate
                }
            },
            {
                new: true
            }
        )
        .populate('master', '_id username')
        .lean();

        return updatedGroup;
    }

    static async findManyByCampaign(campaignId: string): Promise<any[]> {
        const sessions = await SessionMongoose.model.find({
            campaign: campaignId
        })
        .lean();

        return sessions;
    }


    static async findUserMasterActiveCampaignsByGroup(userId: string, groupId: string): Promise<any[]> {
        const campaigns = await CampaignMongoose.model.find({
            group: groupId,
            master: userId
        });
        return campaigns;
    }

    static async removePlayer(campaignId: string) {
        const campaign = await CampaignMongoose.model.findById(
            campaignId
        );
        campaign.userCount--;

        await campaign.save();

        return campaign.toJSON();
    }
    static async findById(campaignId: string): Promise<any> {
        const campaign = await CampaignMongoose.model.findById(
            campaignId
        )
        .populate('master', '_id username')
        .lean();

        return campaign;
    }
 
    static async patchName(campaignId: string, name: string): Promise<any> {
        const campaign = await CampaignMongoose.model.findById(
            campaignId
        );

        campaign.name = name;

        await campaign.save();

        return campaign.toJSON();
    }
    static async createOne(campaign: any): Promise<any> {
        const newCampaign = new CampaignMongoose.model(campaign);
        await newCampaign.save();
        return newCampaign.toJSON();
    }
    static async findByNameAndGroup(groupId: string, name: string): Promise<any> {
        const campaign = await CampaignMongoose.model.findOne({
            group: groupId,
            name
        })
        .lean();

        return campaign;
        
    }
}

export {
    SessionRepository
}