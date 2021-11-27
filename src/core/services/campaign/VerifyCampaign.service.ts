import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";

class VerifyCampaignService {
    static async execute(groupId: string) {
        const campaign = await CampaignRepository.findById(groupId);
        if (!campaign) {
            throw new HttpError(HttpStatus.NOTFOUND, 'Campaign not found');
        }
        return campaign;
    }
}

export { VerifyCampaignService };