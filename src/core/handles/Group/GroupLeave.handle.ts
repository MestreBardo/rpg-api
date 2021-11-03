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
            const member = req.member;
            const user = req.user;
            const group = req.group;

            if (!member || !user || !group)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );



            await MemberRepository.removeMemberById(
                member["_id"]
            );

            await GroupRepository.removeMember(group["_id"]);
            await UserRepository.removeGroup(user["_id"]);

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