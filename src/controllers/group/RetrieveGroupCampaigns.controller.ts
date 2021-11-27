import { Response } from 'express';
import { NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { RetrieveGroupsCampaignsService } from "../../core/services/group/RetrieveGroupsCampaigns.service";
import { HttpSendService } from '../../core/services/HttpSend.service';

class RetrieveGroupCampaignsController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const user = req.user;
            const group = { id: req.params["id"] }
            const campaigns = await RetrieveGroupsCampaignsService.execute(user["id"] || user["_id"], group["id"]);
            HttpSendService.execute(req, res, HttpStatus.OK, campaigns);

        } catch (error) {
            next(error);
        }
    }
}

export { RetrieveGroupCampaignsController };