import { NextFunction, Request, Response } from "express-serve-static-core";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";

class CampaignPatchName {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {

        try {
            const { name } = req.body;
            const { campaignId } = req.params;

            const campaignRenamed = await CampaignRepository.patchName(campaignId, name);

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                campaignRenamed
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
    CampaignPatchName
}