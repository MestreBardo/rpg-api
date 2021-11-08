import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";
import { CheckPasswordService } from "../../services/user/CheckPassword.service";
import { GenerateJwtService } from "../../services/GenerateJwt.service";

class UserUpdate {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {

        try {

            const user = req.user;
            const userUpdate = req.body;

            if (!user || !userUpdate)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                ); 

            const { password, ...updatedUser } = await UserRepository.updateOneById(
                user["_id"], 
                userUpdate
            );

            const token = GenerateJwtService.execute(updatedUser);

            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                token
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
    UserUpdate
}