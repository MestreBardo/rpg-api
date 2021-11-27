import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";

class CampaignPut {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const campaignReceived = req.body;
            const { campaignId } = req.params;
            
            const campaignUpdated = await CampaignRepository.updateOne(campaignId, campaignReceived);

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                campaignUpdated
            )
            
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
    CampaignPut
}