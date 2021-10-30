import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";
import { GenerateGroupSevice } from "../../services/GenerateGroup.service";
import { GenerateMemberService } from "../../services/GenerateMember.service";

class GroupCreate {
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

            const groupReceived = req.body;
            const group = GenerateGroupSevice.execute({
                owner: userId,
                ...groupReceived
            });
            const createdGroup = await GroupRepository.createOne(group);
            const member = GenerateMemberService.execute({
                user: userId,
                group: createdGroup["_id"],
                role: "owner"
            });
            const { role } = await MemberRepository.createOne(member);
            const { username, email } = await UserRepository.addGroup(userId);

            return HttpResponse.create(
                HttpStatus.created,
                req,
                res,
                {
                    ...createdGroup,
                    user: {
                        username,
                        email,
                        role
                    }
                }
            )
        
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
    GroupCreate
}