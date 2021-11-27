import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { Player } from "../../../common/entities/Player.entity";
import { HttpError } from "../../../common/responses/HttpError";
import { PlayerRepository } from "../../../database/repositories/Player.repository";

class VerifyUserCampaignService {
    static async execute(userId: string, campaignId: string): Promise<Player> {
        const player = await PlayerRepository.findByUserOnCampaign(userId, campaignId);
        if(!player) throw new HttpError(HttpStatus.NOTFOUND, "User is not member of this group");
        return player;
        
    }
}
export { VerifyUserCampaignService };