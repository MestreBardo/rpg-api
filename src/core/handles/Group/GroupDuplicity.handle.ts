import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { GroupRepository } from "../../../database/repositories/Group.repository";

class GroupDuplicity {
    static async handle(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        const groupOnDatabase = await GroupRepository.findByName(
            name,
            true
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
    }
}

export {
    GroupDuplicity
}