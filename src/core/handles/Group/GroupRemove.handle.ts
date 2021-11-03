import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";

class GroupRemove {
    static async handle (req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const group = req.group;
            const member = req.otherMember;

            if (!member || !group)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );

            await MemberRepository.removeUser(member["_id"]);
            await GroupRepository.removeMember(group);
            await UserRepository.removeGroup(member["user"])

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                "User removed from group"
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
    GroupRemove
}