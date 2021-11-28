import { Response } from 'express';
import { NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { SaveCampaignTemplateService } from '../../core/services/campaign/SaveCampaignTemplate.service';
import { HttpSendService } from '../../core/services/HttpSend.service';

class SaveCampaignTemplateController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try { 

            const user = req.user;
            const campaign = { id: req.params.id };
            const template = req.body;
            await SaveCampaignTemplateService.execute(user["_id"] || user["id"],campaign.id, template);
            HttpSendService.execute(req, res, HttpStatus.OK, {})
        }
        catch (error) {
            console.log(error);
            next(error);
        }
        
    }
}

export { SaveCampaignTemplateController };