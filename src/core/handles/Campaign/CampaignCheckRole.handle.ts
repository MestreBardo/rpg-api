import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { PlayerRepository } from "../../../database/repositories/Player.repository";

class CampaignCheckRole {
    static handle(roles: string[]) {
        return async (req: RequestWithUser, res: Response, next: NextFunction) => {
            try {
                const player = req.player;

    
                if (roles.includes(player.role))
                    return HttpResponse.create(
                        HttpStatus.unauthorized,
                        req,
                        res,
                        "You don't have permission to do this."
                    );
                
                next();
    
                
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
}

export {
    CampaignCheckRole
}