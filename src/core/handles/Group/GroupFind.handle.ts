import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { ValidationSource } from "../../../common/enums/ValidationSource.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class GroupFind {
    static handle(source: ValidationSource, field: string = "groupId") {
        return async (req: RequestWithUser, res: Response, next: NextFunction) => {
            try {
                const groupId = req[source][field];


                if (!groupId)
                    return HttpResponse.create(
                        HttpStatus.internalServerError,
                        req,
                        res,
                        "Server have a error to process the request!"
                    );
                
                const group = await GroupRepository.findById(
                    groupId
                );
                
                if (!group)
                    return HttpResponse.create(
                        HttpStatus.notFound,
                        req,
                        res,
                        "Group not exist"
                    );

                req.group = group;

                
                return next();
        
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
}

export {
    GroupFind
}