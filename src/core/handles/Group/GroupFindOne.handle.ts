import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class GroupFindOne {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { groupId } = req.params;
                
            const group = await GroupRepository.findById(
                groupId,
                true
            )

            if (!group)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "Group not exist"
                );
            
            return HttpResponse.create(
                    HttpStatus.ok,
                    req,
                    res,
                    group
                    
                );

    
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
    GroupFindOne
}