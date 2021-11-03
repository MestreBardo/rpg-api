import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { CampaignRepository } from "../../../database/repositories/Campaign.repository";
import { PlayerRepository } from "../../../database/repositories/Player.repository";
import { UserRepository } from "../../../database/repositories/User.repository";

class CampaignCreate {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const campaign = req.body;
            const { _id: userId, username, email } = req.user;

            const createdCampaign = await CampaignRepository.createOne({
                master:userId,
                ...campaign
            });
            const { role } = await PlayerRepository.createOne({
                campaign: createdCampaign["_id"],
                user: userId,
                role: "master",
                joinedAt: new Date()
            });

            await CampaignRepository.addPlayer(
                createdCampaign["_id"]
            )

            await UserRepository.addCampaign(
                userId
            )


            return HttpResponse.create(
                HttpStatus.created,
                req,
                res,
                {
                    ...createdCampaign,
                    user: {
                        username,
                        email,
                        role
                    }
                }
            )
        
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
    CampaignCreate
}