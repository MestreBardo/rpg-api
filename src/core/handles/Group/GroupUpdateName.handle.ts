import { NextFunction, Request, Response } from "express-serve-static-core";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class GroupUpdateName {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {

        try {
            const  group  = req.group;
            const { name } = req.body;

            if (!group || !name)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );

            
            const groupRenamed = await GroupRepository.patchName(
                group["_id"], 
                name
            );

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
    GroupUpdateName
}