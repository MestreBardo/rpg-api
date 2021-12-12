
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { PlayerRepository } from "../../../database/repositories/Player.repository";
import { SessionRepository } from "../../../database/repositories/Session.repository";

class RetrievePlayerCharacterService {
    static async execute(user: any, playerId: string) {
        const playerFinded = await PlayerRepository.findById(playerId);
        if (!playerFinded) {
            throw new HttpError(HttpStatus.NOTFOUND, "User not found on campaign");
        }
        const me = await PlayerRepository.findByUserOnCampaign(user._id, playerFinded.campaign);
        return {
            ...playerFinded,
            me
        };
    }
}

export { RetrievePlayerCharacterService };