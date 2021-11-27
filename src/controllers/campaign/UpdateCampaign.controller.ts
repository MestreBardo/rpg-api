import { NextFunction, Response } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { UpdateCampaignService } from '../../core/services/campaign/UpdateCampaign.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
class UpdateCampaignController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const user = req.user;
            const campaign = { id: req.params["id"] };
            const campaignUpdate = req.body;
            const updatedCampaign = await UpdateCampaignService.execute(user["_id"], campaign["id"], campaignUpdate);
            HttpSendService.execute(req, res, HttpStatus.OK, updatedCampaign);
        } catch (error) {
            next(error);
        }
    }
}
 
export { UpdateCampaignController };