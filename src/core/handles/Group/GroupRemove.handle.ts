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
            const { memberId, groupId } = req.params;
            const member = await MemberRepository.findById(memberId);

            const user = await UserRepository.findOneById(member.user, true);

            if(!member)
                return HttpResponse.create(
                    HttpStatus.gone,
                    req, 
                    res, 
                    "Member alrealdy gone!"
                );

            if(!user)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req, 
                    res, 
                    "User not exist in database!"
                ); 


            await MemberRepository.removeUser(memberId);
            await GroupRepository.removeMember(groupId);
            await UserRepository.removeGroup(member.user)

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