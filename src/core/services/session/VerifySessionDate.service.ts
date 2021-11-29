import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpError } from "../../../common/responses/HttpError";
import { SessionRepository } from "../../../database/repositories/Session.repository";
class VerifySessionDateService {
    static async execute(sessionDate: Date, campaign: any) { 
        
        const session = await SessionRepository.findByDate(sessionDate, campaign);
        if(session) throw new HttpError(HttpStatus.NOTFOUND, "Session date is not available");
        return session;
    }
}

export { VerifySessionDateService };