import { SessionRepository } from "../../../database/repositories/Session.repository";

class RetrieveCampaignSessionsService {
    static async execute(campaignId: string) {
        const sessionsFinded: any[] = await SessionRepository.findManyByCampaign(campaignId);
        return sessionsFinded;
    }
}

export { RetrieveCampaignSessionsService };