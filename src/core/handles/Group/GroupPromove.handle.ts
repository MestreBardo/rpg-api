import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class GroupPromove {
    static async handle (req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const member = req.otherMember;

            if (!member)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );

            const promovedMember = await MemberRepository.promoveUser(member["_id"]);

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                {
                    _id: promovedMember["user"]["_id"],
                    username: promovedMember["user"]["username"],
                    email: promovedMember["user"]["email"],
                    role: promovedMember["role"]
                }
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
    GroupPromove
}