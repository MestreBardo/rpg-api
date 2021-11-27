import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";

class UserFindOne {
    static async handle(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = req.params;

            if (!userId)
                return HttpResponse.create(
                    HttpStatus.badRequest,
                    req,
                    res,
                    "UserId not found in params"
                )


            const userOnDatabase = await UserRepository.findOneById(
                userId
            );
    
    
            if (!userOnDatabase)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "User not found in database"
                )

            const { password, ...user } = userOnDatabase;

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                user
            )
            
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
    UserFindOne
}