import { Player } from "../../../common/entities/Player.entity";
import { PlayerRepository } from "../../../database/repositories/Player.repository";

class RetrieveUserCampaignsService {
    static async execute(userId: string): Promise<Player[]> {
        const userCampaigns = await PlayerRepository.findCampaignsByUser(userId);

        return userCampaigns;
    }
}

export { RetrieveUserCampaignsService };