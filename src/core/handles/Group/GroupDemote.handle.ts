import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";

class GroupDemote {
    static async handle (req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { memberId } = req.params;
            const member = await MemberRepository.findById(memberId);

            const user = await UserRepository.findOneById(member.user, true);

            if(!user)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req, 
                    res, 
                    "User not exist in database!"
                ); 


            if(!["admin", "owner"].includes(member.role))
                return HttpResponse.create(
                    HttpStatus.conflict,
                    req, 
                    res, 
                    "User alrealdy demoted!"
                );

            const demotedMember = await MemberRepository.demoteUser(memberId);

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                {
                    _id: user["_id"],
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    role: demotedMember.role
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
    GroupDemote
}