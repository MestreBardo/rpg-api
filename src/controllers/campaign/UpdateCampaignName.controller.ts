import { NextFunction, Response } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { UpdateCampaignService } from '../../core/services/campaign/UpdateCampaign.service';
import { UpdateGroupNameService } from '../../core/services/group/UpdateGroupName.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
class UpdateCampaignNameController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const user = req.user;
            const campaign = { id: req.params["id"] };
            const campaignUpdate = req.body;

            const updatedGroup = await UpdateCampaignService.execute(user["_id"], campaign["id"], campaignUpdate);
            HttpSendService.execute(req, res, HttpStatus.OK, updatedGroup);
        } catch (error) {
            next(error);
        }
    }
}
 
export { UpdateCampaignNameController };