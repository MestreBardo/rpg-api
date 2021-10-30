import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { MemberMongoose } from "../../../database/models/Member.mongoose";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";
import { GenerateMemberService } from "../../services/GenerateMember.service";

class GroupJoin {
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
            )

            if (memberOnDatabase)
                return HttpResponse.create(
                    HttpStatus.conflict,
                    req,
                    res,
                    "User already exists on group"
                );
            
            const group = await GroupRepository.addMember(
                groupId
            );

            const member = GenerateMemberService.execute({
                user: userId,
                group: groupId,
                role: "user"
            });

            const createdMember = await MemberRepository.createOne(
                member,
                true
            );

            const user = await UserRepository.addGroup(
                userId,
            )

            const { username, email } = user;

            return HttpResponse.create(
                HttpStatus.created,
                req,
                res,
                {
                    ...group,
                    user: {
                        username,
                        email,
                        role: "user"
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
    GroupJoin
}