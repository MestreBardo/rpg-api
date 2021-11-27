import { Group } from "../../../common/entities/Group.entity";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";
import { VerifyCampaignService } from "./VerifyCampaign.service";
import { VerifyUserCampaignService } from "./VerifyUserCampaign.service";

class UpdateCampaignService {
    static async execute(userId: string, campaignId: string, campaignUpdate: any): Promise<Group> {
        await VerifyCampaignService.execute(campaignId);
        await VerifyUserCampaignService.execute(userId, campaignId);
        const updatedGroup = await CampaignRepository.updateOne(campaignId, campaignUpdate);
        return updatedGroup;
    }
}

export { UpdateCampaignService };