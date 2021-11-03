import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";
import { GenerateJwtService } from "../../services/GenerateJwt.service";
import { GeneratePasswordService } from "../../services/GeneratePassword.service";
import { GenerateUserSevice } from "../../services/GenerateUser.service";

class AuthorizationSignUp {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body;

            if (!user)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );

            user.password = await GeneratePasswordService.execute(user.password);

            const { password, ...userCreated} = await UserRepository.createOne(user);
            const token = GenerateJwtService.execute(userCreated);
            return HttpResponse.create(
                HttpStatus.created,
                req,
                res,
                token
            )
        } catch (error: any) {
            return HttpResponse.create(
                HttpStatus.internalServerError,
                req,
                res,
                error.message
            );
        }
        
    }
}

export {
    AuthorizationSignUp
}