import { NextFunction, Response } from "express-serve-static-core";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";
import { PlayerRepository } from "../../../database/repositories/Player.repository";
import { UserRepository } from "../../../database/repositories/User.repository";

class CampaignLeave {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { campaignId } = req.params;
            const { _id: userId } = req.user;
            await PlayerRepository.removePlayer(
                userId,
                campaignId
            );

            await CampaignRepository.removePlayer(
                campaignId
            )

            await UserRepository.removeCampaign(
                userId
            )

            return HttpResponse.create(
                HttpStatus.ok,
                req, 
                res, 
                "Campaign leave with success!"
            );

        } catch (error) {
            return HttpResponse.create(
                +error.code || HttpStatus.internalServerError,
                req, 
                res, 
                error.message
            );
        }
       

    }
}

export {
    CampaignLeave
}