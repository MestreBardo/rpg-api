import { VerifyCampaignService } from "./VerifyCampaign.service";
import { VerifyUserCampaignService } from "./VerifyUserCampaign.service";
import { CheckCampaignRoleService } from "./CheckCampaignRole.service";
import { PlayerRepository } from "../../../database/repositories/Player.repository";

class SaveCampaignTemplateService {
    static async execute(userId: string, campaignId: string, template: any){
        console.log(campaignId);
        const player = await VerifyUserCampaignService.execute(userId, campaignId);
        CheckCampaignRoleService.execute(player, ["master"]);
        console.log(template);
        await PlayerRepository.updateTemplate(campaignId, template);
    }
}

export { SaveCampaignTemplateService };