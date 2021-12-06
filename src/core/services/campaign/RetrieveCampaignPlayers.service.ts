import { MemberRepository } from "../../../database/repositories/Member.repository";
import { PlayerRepository } from "../../../database/repositories/Player.repository";
import { VerifyCampaignService } from "./VerifyCampaign.service";

class RetrieveCampaignPlayersService {
    static async execute(campaignId: string) {
        await VerifyCampaignService.execute(campaignId)
        const members = PlayerRepository.findByCampaign(campaignId);
        return members;
    }
}

export { RetrieveCampaignPlayersService };