import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class CheckMemberRole {
    static async handle (req: RequestWithUser, res: Response, next: NextFunction) {
        const { memberId } = req.params;
        const { _id: userId } = req.user;
        const { role } = req.member;

        if (!role)
            return HttpResponse.create(
                HttpStatus.badRequest,
                req,
                res,
                "Group Role not found in request."
            );
        
        const { groupId } = req.params;

        const member = await MemberRepository.findById(
            memberId,
            true,
        );

        if (!member)
            return HttpResponse.create(
                HttpStatus.unauthorized,
                req,
                res,
                "This member not exist."
            )

        if (member.user === userId)
            return HttpResponse.create(
                HttpStatus.unauthorized,
                req,
                res,
                "You cant do this to yourself"
            );

        if (member.role === "owner")
            return HttpResponse.create(
                HttpStatus.unauthorized,
                req,
                res,
                "You dont have permission to do this."
            );

        next();
                
    }
}

export {
    CheckMemberRole
}