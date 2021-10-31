import { NextFunction, Request, Response } from "express-serve-static-core";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class GroupPatchName {
    static async handle(req: Request, res: Response, next: NextFunction) {

        try {
            const { groupId } = req.params;
            const { name } = req.body;

            const group = await GroupRepository.findById(groupId);

            if (!group)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "Group not found"
                );
            
            const groupRenamed = await GroupRepository.patchName(groupId, name);

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                groupRenamed
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
    GroupPatchName
}