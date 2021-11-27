import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";
import { GenerateJwtService } from "../../services/GenerateJwt.service";

class UserPasswordUpdate {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const { password } = req.body;

            if (!user || !password)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                ); 


            const updatedUser = await UserRepository.updatePasswordById(
                user["_id"], 
                password
            );

            const token = GenerateJwtService.execute(updatedUser);

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
    UserPasswordUpdate
}