import { NextFunction, Response } from "express";
import { HttpStatus } from "../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { LeaveCampaignPlayerService } from "../../core/services/campaign/LeaveCampaignPlayer.service";
import { RemoveCampaignPlayerService } from "../../core/services/campaign/RemoveCampaignPlayer.service";
import { HttpSendService } from "../../core/services/HttpSend.service";

class LeavePlayerCampaignController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const userToRemove = req.params.id;
            const player = await LeaveCampaignPlayerService.execute(userToRemove);
            HttpSendService.execute(req, res, HttpStatus.OK, {}) 
        } catch (error) {
            next(error);
        }
    }
}

export { LeavePlayerCampaignController };