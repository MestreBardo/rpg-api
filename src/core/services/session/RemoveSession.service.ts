import { SessionRepository } from "../../../database/repositories/Session.repository";
import { VerifyCampaignService } from "../campaign/VerifyCampaign.service";
import { VerifyUserCampaignService } from "../campaign/VerifyUserCampaign.service";
import { VerifySessionDateService } from "./VerifySessionDate.service";

class RemoveSessionService {
    static async execute(sessionId: string) { 
        console.log(sessionId);
        await SessionRepository.removeById(sessionId);
    }
}

export { RemoveSessionService };