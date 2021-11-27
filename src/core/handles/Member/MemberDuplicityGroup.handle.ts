import { NextFunction, Response } from "express"
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended"
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class MemberDuplicityGroup {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction ){

        try {
            const user = req.user;
            const group = req.group;

            if (!user || !group)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                ); 

            const member = await MemberRepository.findByUserOnCampaign(
                user["_id"],
                group["_id"]
            )

            if (member)
                return HttpResponse.create(
                    HttpStatus.conflict,
                    req,
                    res,
                    "User already exists on group"
                );

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
    MemberDuplicityGroup
}