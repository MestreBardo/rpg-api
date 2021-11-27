import { CampaignMongoose } from "../models/Campaign.mongoose"

class CampaignRepository {
    static async addPlayer(campaignId: string) {
        const campaign = await CampaignMongoose.model.findById(
            campaignId
        );
        campaign.userCount++;

        await campaign.save();

        return campaign.toJSON();
    }

    static async findByNameInGroup(name: string, groupId: string): Promise<any> { 
        const campaign = await CampaignMongoose.model.findOne({
            group: groupId,
            name
        })
        .lean();

        return campaign;
    }

    static async create(receivedCampaign: any): Promise<any> {
        const campaign = new CampaignMongoose.model(receivedCampaign);
        await campaign.save();
        return campaign.toJSON();
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

    static async findManyByGroup(groupId: string): Promise<any[]> {
        const campaigns = await CampaignMongoose.model.find({
            group: groupId
        })
        .lean();

        return campaigns;
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
    CampaignRepository
}