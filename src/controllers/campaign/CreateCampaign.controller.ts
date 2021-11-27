import { NextFunction } from 'express';
import { Response } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { CreateCampaignService } from '../../core/services/campaign/CreateCampaign.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
class CreateCampaignController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const receivedCampaign = req.body;
            const campaign = await CreateCampaignService.execute(user["_id"], receivedCampaign);
            HttpSendService.execute(req, res, HttpStatus.OK, campaign) 
        } catch (error) {
            next(error);
        }
    }
}

export { CreateCampaignController };