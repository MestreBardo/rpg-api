import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";

class GroupJoin {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {

            const user = req.user;
            const group = req.group;

            if (!user || !group)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );
            
            

            const createdMember = await MemberRepository.createOne(
                {
                    user: user["_id"],
                    group: group["_id"],
                    role: "user",
                    joinedAt: new Date()
                }
            );

            await GroupRepository.addMember(
                group["_id"]
            );

            await UserRepository.addGroup(
                user["_id"],
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
                        role: createdMember["role"]
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