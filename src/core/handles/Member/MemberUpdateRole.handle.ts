import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class MemberUpdateRole {
    static async handle (req: RequestWithUser, res: Response, next: NextFunction) {

        try {
            const user = req.user;
            const { memberId } = req.params;

            if (!user || !memberId)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                ); 

            const member = await MemberRepository.findById(
                memberId,
            );

            if (!member)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "This member not exist."
                )

            if (member["user"] === user["_id"])
                return HttpResponse.create(
                    HttpStatus.unauthorized,
                    req,
                    res,
                    "You cant do this to yourself"
                );

            if (member["role"] === "owner")
                return HttpResponse.create(
                    HttpStatus.unauthorized,
                    req,
                    res,
                    "You dont have permission to do this."
                );
            req.otherMember = member;
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
    MemberUpdateRole
}