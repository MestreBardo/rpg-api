import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { PlayerRepository } from "../../../database/repositories/Player.repository";
import { UserRepository } from "../../../database/repositories/User.repository";
import { CheckCampaignRoleService } from "./CheckCampaignRole.service";
import { VerifyUserCampaignService } from "./VerifyUserCampaign.service";

class AddCampaignPlayerService {
    static async execute(user: any, receivedPlayer: any, campaingId: string) {
        const player = await VerifyUserCampaignService.execute(user._id, campaingId);
        console.log(player);
        await CheckCampaignRoleService.execute(player, ['master']);
        const playerInDatabase = await PlayerRepository.findByUserOnCampaign(receivedPlayer, campaingId);
        if (playerInDatabase) {
            throw new HttpError(HttpStatus.CONFLICT, "User already in campaign");
        }
        const newPlayer = await PlayerRepository.addPlayer(receivedPlayer, campaingId, player.template);
        const userPlayer = await UserRepository.findOneByIdRedux(newPlayer.user);
        return {
            ...newPlayer,
            user: {
                ...userPlayer
            }
        };
    }
}

export { AddCampaignPlayerService };