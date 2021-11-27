import { CampaignRepository } from "../../../database/repositories/Campaign.repository";
import { PlayerRepository } from "../../../database/repositories/Player.repository";

import { VerifyGroupService } from "../group/VerifyGroup.service";
import { VerifyUserGroupService } from "../group/VerifyUserGroup.service";

class CreateCampaignService {
    static async execute(user: string, receivedCampaign: any) { 
        const groupFounded = await VerifyGroupService.execute(receivedCampaign.group);
        await VerifyUserGroupService.execute(user, groupFounded["_id"]);
        receivedCampaign.master = user;
        const campaign = await CampaignRepository.create(receivedCampaign);
        const player = await PlayerRepository.createOne({
            user,
            campaign: campaign["_id"],
            role: "master",
            joinedAt: new Date()
        });

        return {
            ...campaign,
            me: player,
        };
    }
}

export { CreateCampaignService };