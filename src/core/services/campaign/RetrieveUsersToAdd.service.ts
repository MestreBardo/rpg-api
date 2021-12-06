import { MemberRepository } from "../../../database/repositories/Member.repository";
import { PlayerRepository } from "../../../database/repositories/Player.repository";
import { SessionRepository } from "../../../database/repositories/Session.repository";
import { VerifyCampaignService } from "./VerifyCampaign.service";

class RetrieveUsersToAddService {
    static async execute(userId: string, campaignId: string, textToSearch: string) {
        const campaign = await VerifyCampaignService.execute(campaignId);
        const playersInCampaign = await PlayerRepository.findByCampaign(campaignId);
        const playersInGroup = await MemberRepository.findAllUsers(campaign.group);
        const playersToReturn = playersInGroup
            .filter(player =>  
                !playersInCampaign
                    .find(p => 
                        p.user._id.toString() === player.user._id.toString()
                    )
                && player.user.username.toLowerCase().includes(textToSearch.toLowerCase())
            );
        return playersToReturn;
    }
}

export { RetrieveUsersToAddService };