import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";

class UserDuplicity {
    static async handle(req: Request, res: Response, next: NextFunction) {
        const { email, username } = req.body;
        const userOnDatabase = await UserRepository.findByUsernameOrEmail(
            username || email,
            email || username,
            true
        )

        if (userOnDatabase) {
            const errors: string[] = [];
            if (userOnDatabase.username === username) {
                errors.push("Username alrealdy exists in database");
            }

            if (userOnDatabase.email === email) {
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
    UserDuplicity
}