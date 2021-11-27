import { Group } from "../../../common/entities/Group.entity";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";
import { CheckCampaignRoleService } from "./CheckCampaignRole.service";
import { VerifyCampaignService } from "./VerifyCampaign.service";
import { VerifyCampaignDuplicityService } from "./VerifyCampaignDuplicity.service";
import { VerifyUserCampaignService } from "./VerifyUserCampaign.service";

class UpdateCampaignNameService {
    static async execute(userId: string, campaignId: string, campaignUpdate: any): Promise<Group> {
        await VerifyCampaignService.execute(campaignId);
        await VerifyCampaignDuplicityService.execute(campaignUpdate.name, campaignUpdate.group);
        const player = await VerifyUserCampaignService.execute(userId, campaignId);
        await CheckCampaignRoleService.execute(player, ["master"]);
        const updatedGroup = await CampaignRepository.updateName(campaignId, campaignUpdate.name);
        return updatedGroup;
    }
}

export { UpdateCampaignNameService };