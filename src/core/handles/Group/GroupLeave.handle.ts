import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";

class GroupLeave {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { _id: userId } = req.user;

            if (!userId)
                return HttpResponse.create(
                    HttpStatus.badRequest,
                    req,
                    res,
                    "User not found in request"
                );
            
            const { groupId } = req.params;
            const memberOnDatabase = await MemberRepository.findByUserOnCampaign(
                userId,
                groupId,
                true
            );

            if (!memberOnDatabase)
                return HttpResponse.create(
                    HttpStatus.gone,
                    req,
                    res,
                    "User Alrealdy gone!"
                );
            

            if (memberOnDatabase.role === "owner")
                return HttpResponse.create(
                    HttpStatus.conflict,
                    req,
                    res,
                    "The owner can't leave group"
                );

            await MemberRepository.removeMember(
                userId,
                groupId
            );

            await GroupRepository.removeMember(groupId);
            await UserRepository.removeGroup(userId);

            return HttpResponse.create(
                HttpStatus.ok,
                req, 
                res, 
                "Group leave with success!"
            );
        } 
        catch (error) {
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
    GroupLeave
}