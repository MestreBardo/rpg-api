import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class MemberFind {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {

        try {
            const group = req.group;
            const user = req.user;

            if (!group || !user)
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

            if (!member)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "User not exists on group"
                );

            req.member = member;
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
    MemberFind
}