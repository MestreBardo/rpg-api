import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";
import { MemberRepository } from "../../../database/repositories/Member.repository";

class GroupMembers {
    static async handle(req: Request, res: Response, next: NextFunction) {

        try {
            const { groupId } = req.params;
            const { page } = req.query;

            const group = await GroupRepository.findById(groupId);

            if (!group)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "Group not found"
                );
            
            const members = await MemberRepository.findUserByGroup(groupId, +page || 1);

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                members
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
    GroupMembers
}