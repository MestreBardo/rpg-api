import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";

class CheckCampaignRoleService {
    static async execute(player: any, roles: any[]) {
        if (!roles.includes(player.role))
            throw new HttpError(HttpStatus.UNAUTHORIZED, "User is not authorized to perform this action");
    }
}

export { CheckCampaignRoleService };