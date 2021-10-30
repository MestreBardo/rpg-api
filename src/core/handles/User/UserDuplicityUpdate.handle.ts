import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";

class UserDuplicityUpdate {
    static async handle(req: Request, res: Response, next: NextFunction) {
        const userOnDatabase = await UserRepository.findByUsernameOrEmailOtherId(
            req.params.id,
            req.body.username || req.body.email,
            req.body.username || req.body.email,
            true
        )

        if (userOnDatabase) {
            const errors: string[] = [];
            if (userOnDatabase.username === req.body.username) {
                errors.push("Username alrealdy exists in database");
            }

            if (userOnDatabase.email === req.body.email) {
                errors.push("Email alrealdy exists in database");
            }

            return HttpResponse.create(
                HttpStatus.conflict,
                req,
                res,
                errors
            )
        }

        next()
    }
}

export {
    UserDuplicityUpdate
}