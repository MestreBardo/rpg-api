import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";

class UserTokenFind {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { token } = req; 

            if (!token || !token.sub)
                return HttpResponse.create(
                    HttpStatus.badRequest,
                    req, 
                    res, 
                    "Token not present or incorrect"
                );
            
            const user = await UserRepository.findOneById(
                token.sub
            );

            if (!user)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req, 
                    res, 
                    "User not found in database!"
                );

            req.user = user;

            next();

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
    UserTokenFind
}