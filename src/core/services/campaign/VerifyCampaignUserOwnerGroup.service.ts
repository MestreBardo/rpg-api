import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { PlayerRepository } from "../../../database/repositories/Player.repository";

class VerifyCampaignUserGroupService {
    static async execute(userId: string, groupId: string) {
        const activeMember = await PlayerRepository.findUserGroupActiveCampaigns(userId, groupId);
        if (activeMember.length) 
            throw new HttpError(HttpStatus.UNAUTHORIZED, { message: 'You still have this active campaigns', campaigns: activeMember.map(active => active.campaign) });
    }
}

export { VerifyCampaignUserGroupService };