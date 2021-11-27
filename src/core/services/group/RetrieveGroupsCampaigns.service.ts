import { CampaignRepository } from "../../../database/repositories/Campaign.repository";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { PlayerRepository } from "../../../database/repositories/Player.repository";

class RetrieveGroupsCampaignsService {
    static async execute(userId: string, groupId: string) {
        const campaignsFinded: any[] = await CampaignRepository.findManyByGroup(groupId);
        for await (const campaign of campaignsFinded) {
            campaign.me = await PlayerRepository.findByUserOnCampaign(userId, campaign._id.toString());
        }
        return campaignsFinded;
    }
}

export { RetrieveGroupsCampaignsService };