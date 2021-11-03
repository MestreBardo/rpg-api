import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class GroupMembers {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {

        try {
            const group = req.group;
            const { page } = req.query;

            if (!group)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );


            
            const members = await MemberRepository
                .findUserByGroup(
                    group["_id"], 
                    +page || 1
                );

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                members
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
    GroupMembers
}