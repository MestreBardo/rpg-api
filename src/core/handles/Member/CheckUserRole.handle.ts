import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class CheckUserRole {
    static async handle (req: RequestWithUser, res: Response, next: NextFunction) {
        const { _id: userId } = req.user;
        const { groupId } = req.params;
        if (!userId)
            return HttpResponse.create(
                HttpStatus.badRequest,
                req,
                res,
                "User not found in request."
            );

        const member = await MemberRepository.findByUserOnCampaign(
            userId,
            groupId
        );

        if (!member)
            return HttpResponse.create(
                HttpStatus.unauthorized,
                req,
                res,
                "You dont belong to this group."
            )

        if (!["owner", "admin"].includes(member.role))
            return HttpResponse.create(
                HttpStatus.unauthorized,
                req,
                res,
                "You dont have permission to do this."
            );
        
        req.member = member;

        next();
                
    }
}

export {
    CheckUserRole
}