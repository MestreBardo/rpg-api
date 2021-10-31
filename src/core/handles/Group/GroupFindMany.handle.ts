import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class GroupFindMany {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, name } = req.query;
                
            const group = await GroupRepository.findByMany(
                name as string,
                +page ?? 1,
                true
            )

            if (!group.length)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "None group found"
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
    GroupFindMany
}