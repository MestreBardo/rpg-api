import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";
import { GenerateJwtService } from "../../services/GenerateJwt.service";
import { GenerateUserSevice } from "../../services/GenerateUser.service";

class SignUp {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await GenerateUserSevice.execute(req.body);
            const { password, ...userCreated} = await UserRepository.createOne(user);
            const token = GenerateJwtService.execute(userCreated);
            return HttpResponse.create(
                HttpStatus.created,
                req,
                res,
                {token}
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
    SignUp
}