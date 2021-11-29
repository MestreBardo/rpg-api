import { Response } from 'express';
import { NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { RetrieveCampaignSessionsService } from "../../core/services/campaign/RetrieveCampaignSessions.service";
import { HttpSendService } from '../../core/services/HttpSend.service';

class RetrieveCampaignSessionsController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const campaign = { id: req.params["id"] }
            const sessions = await RetrieveCampaignSessionsService.execute(campaign["id"]);
            HttpSendService.execute(req, res, HttpStatus.OK, sessions);

        } catch (error) {
            next(error);
        }
    }
}

export { RetrieveCampaignSessionsController };