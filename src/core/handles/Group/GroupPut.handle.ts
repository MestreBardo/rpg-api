import { NextFunction, Request, Response } from "express-serve-static-core";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class GroupPut {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { groupId } = req.params;
            const groupReceived = req.body;

            const group = await GroupRepository.findById(groupId);

            if (!group)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "Group not found"
                );
            
            const groupUpdated = await GroupRepository.updateOne(groupId, groupReceived);

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                groupUpdated
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
    GroupPut
}