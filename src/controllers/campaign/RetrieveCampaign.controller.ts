import { Response, NextFunction } from "express";
import { HttpStatus } from "../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { RetrieveCampaignService } from "../../core/services/campaign/RetrieveCampaign.service";
import { HttpSendService } from "../../core/services/HttpSend.service";

class RetrieveCampaignController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        const user = req.user;
        const campaign = { id: req.params.id };
        const findedCampaign = await RetrieveCampaignService.execute(campaign.id, user["_id"] || user["id"]);
        HttpSendService.execute(req, res, HttpStatus.OK, findedCampaign)
    }
}

export { RetrieveCampaignController };