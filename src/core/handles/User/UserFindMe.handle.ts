import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";

class UserFindMe {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {

        try {
            const { _id: userId } = req.token;

            if (!userId)
                return HttpResponse.create(
                    HttpStatus.badRequest,
                    req,
                    res,
                    "User not found in request"
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
    UserFindMe
}