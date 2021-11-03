import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";

class MemberAdminRole {
    static async handle (req: RequestWithUser, res: Response, next: NextFunction) {

        try {
            const member = req.member;

            if (!member)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );            

            if (!["owner", "admin"].includes(member.role))
                return HttpResponse.create(
                    HttpStatus.unauthorized,
                    req,
                    res,
                    "You dont have permission to do this."
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
    MemberAdminRole
}