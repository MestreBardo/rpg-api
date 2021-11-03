import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";

class CampaignDuplicity {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { _id: groupId } = req.group;
            const { name } = req.body; 

            if (!name || !groupId)
                return HttpResponse.create(
                    HttpStatus.badRequest,
                    req, 
                    res, 
                    "Token not present or incorrect"
                );

            const campaign = await CampaignRepository.findByNameAndGroup(
                groupId,
                name
            );

            if (campaign)
                return HttpResponse.create(
                    HttpStatus.conflict,
                    req,
                    res,
                    "Already have a campaign in this group with this name!"
                )

            next();
            
        } catch (error) {
            return HttpResponse.create(
                +error.code || HttpStatus.internalServerError,
                req, 
                res, 
                error.message
            )
        }
        
    }
}

export {
    CampaignDuplicity
}