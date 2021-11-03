import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";
import { UserRepository } from "../../../database/repositories/User.repository";

class GroupCreate {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const group = req.body;
           
            if (!user || !group)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );

            const createdGroup = await GroupRepository.createOne({
                owner: user["_id"],
                ...group
            });

            const member = await MemberRepository.createOne({
                user: user["_id"],
                group: createdGroup["_id"],
                role: "owner",
                joinedAt: new Date()
            });

            await UserRepository
                .addGroup(
                    user["_id"]
                );

            return HttpResponse.create(
                HttpStatus.created,
                req,
                res,
                {
                    ...createdGroup,
                    user: {
                        _id: user["_id"],
                        username: user["username"],
                        email: user["email"],
                        role: member["role"]
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