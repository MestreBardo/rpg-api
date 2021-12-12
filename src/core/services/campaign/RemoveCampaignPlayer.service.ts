import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { PlayerRepository } from "../../../database/repositories/Player.repository";
import { UserRepository } from "../../../database/repositories/User.repository";
import { CheckCampaignRoleService } from "./CheckCampaignRole.service";
import { VerifyUserCampaignService } from "./VerifyUserCampaign.service";

class RemoveCampaignPlayerService {
    static async execute(user: any, userToRemove: string) {
        const playerInDatabase: any = await PlayerRepository.findById(userToRemove);
        if (!playerInDatabase) {
            throw new HttpError(HttpStatus.NOTFOUND, "User not found on campaign");
        }
        const player = await VerifyUserCampaignService.execute(user._id, playerInDatabase.campaign);
        await CheckCampaignRoleService.execute(player, ['master']);
        
        await PlayerRepository.removePlayerById(userToRemove);
        return {
            removedPlayer: playerInDatabase._id
        }
    }
}

export { RemoveCampaignPlayerService };