import { SessionRepository } from "../../../database/repositories/Session.repository";
import { VerifyCampaignService } from "../campaign/VerifyCampaign.service";
import { VerifyUserCampaignService } from "../campaign/VerifyUserCampaign.service";
import { VerifySessionDateService } from "./VerifySessionDate.service";

class CreateSessionService {
    static async execute(user: string, receivedSession: any) { 
        
        const campaignFounded = await VerifyCampaignService.execute(receivedSession.campaign);
        await VerifyUserCampaignService.execute(user, campaignFounded["_id"]);
        await VerifySessionDateService.execute(receivedSession.sessionDate, campaignFounded["_id"])
        receivedSession.master = user;
        const session = await SessionRepository.create(receivedSession);

        return {
            ...session
        };
    }
}

export { CreateSessionService };