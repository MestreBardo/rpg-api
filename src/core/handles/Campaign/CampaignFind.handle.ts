import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { ValidationSource } from "../../../common/enums/ValidationSource.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";

class CampaignFind {
    static handle(source: ValidationSource, field: string = "campaignId") {
        return async (req: RequestWithUser, res: Response, next: NextFunction) => {
            try {
                const campaignId = req[source][field];
                    
                const campaign = await CampaignRepository.findById(
                    campaignId
                )

                if (!campaign)
                    return HttpResponse.create(
                        HttpStatus.notFound,
                        req,
                        res,
                        "Campaign not exist"
                    );

                req.campaign = campaign;
                
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
}

export {
    CampaignFind
}