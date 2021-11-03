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

    static async removePlayer(campaignId: string) {
        const campaign = await CampaignMongoose.model.findById(
            campaignId
        );
        campaign.userCount--;

        await campaign.save();

        return campaign.toJSON();
    }
    static async findById(campaignId: string): Promise<Campaign> {
        const campaign = await CampaignMongoose.model.findById(
            campaignId
        )
        .lean();

        return campaign;
    }
    static async updateOne(campaignId: string, campaignReceived: Campaign): Promise<Campaign> {
        const { description, system } = campaignReceived;
        const campaign = await CampaignMongoose.model.findById(
            campaignId
        );

        campaign.description = description || campaign.description;
        campaign.system = system || campaign.system;

        await campaign.save();

        return campaign.toJSON();
    }
    static async patchName(campaignId: string, name: string): Promise<Campaign> {
        const campaign = await CampaignMongoose.model.findById(
            campaignId
        );

        campaign.name = name;

        await campaign.save();

        return campaign.toJSON();
    }
    static async createOne(campaign: Campaign): Promise<Campaign> {
        const newCampaign = new CampaignMongoose.model(campaign);
        await newCampaign.save();
        return newCampaign.toJSON();
    }
    static async findByNameAndGroup(groupId: string, name: string): Promise<Campaign> {
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