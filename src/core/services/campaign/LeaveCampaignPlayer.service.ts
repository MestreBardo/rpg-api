import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { PlayerRepository } from "../../../database/repositories/Player.repository";
import { UserRepository } from "../../../database/repositories/User.repository";
import { CheckCampaignRoleService } from "./CheckCampaignRole.service";
import { VerifyUserCampaignService } from "./VerifyUserCampaign.service";

class LeaveCampaignPlayerService {
    static async execute(userToRemove: string) {
       console.log("teste");
        const playerInDatabase: any = await PlayerRepository.findById(userToRemove);
        if (!playerInDatabase) {
            throw new HttpError(HttpStatus.NOTFOUND, "User not found on campaign");
        }

        
        await CheckCampaignRoleService.execute(playerInDatabase, ['player']);
        
        await PlayerRepository.removePlayerById(userToRemove);
        return {
            removedPlayer: playerInDatabase._id
        }
    }
}

export { LeaveCampaignPlayerService };