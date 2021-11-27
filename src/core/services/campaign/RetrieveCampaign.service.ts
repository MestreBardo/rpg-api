import { CampaignRepository } from "../../../database/repositories/Campaign.repository";
import { PlayerRepository } from "../../../database/repositories/Player.repository";

class RetrieveCampaignService {
    static async execute(campaignId: string, userId: string) {
        const campaign = await CampaignRepository.findById(campaignId);
        const me = await PlayerRepository.findByUser(userId);
        return {
            ...campaign,
            me
        };
    }
}

export { RetrieveCampaignService };