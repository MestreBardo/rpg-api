import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";

class VerifyCampaignDuplicityService {
    static async execute(campaignName: string, groupId: string) {
        const campaignInDatabe = await CampaignRepository.findByNameInGroup(campaignName, groupId);
        if (campaignInDatabe) {
            throw new HttpError(HttpStatus.CONFLICT,"Campaign already exists");
        }
    }
}

export { VerifyCampaignDuplicityService };