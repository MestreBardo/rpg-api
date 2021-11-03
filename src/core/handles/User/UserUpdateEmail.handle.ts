import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";
import { GenerateJwtService } from "../../services/GenerateJwt.service";

class UserEmailUpdate {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {

        try {
            const user = req.user;

            const { email } = req.body;

            if (!email || !user)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                ); 


            const { password, ...updateUser } = await UserRepository.updateEmailById(
                user["_id"], 
                email
            );

            const token = GenerateJwtService.execute(user);

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                token
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
    UserEmailUpdate
}