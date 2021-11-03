import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class GroupDuplicity {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {

            const { name } = req.body;

            if (!name)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );

            const groupOnDatabase = await GroupRepository.findByName(
                name,
            )

            if (groupOnDatabase) {
                return HttpResponse.create(
                    HttpStatus.conflict,
                    req,
                    res,
                    "This group name is already taken!"
                )
            }

            next()

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
    GroupDuplicity
}