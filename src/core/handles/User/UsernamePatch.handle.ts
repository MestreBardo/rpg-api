import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";
import { CheckPasswordService } from "../../services/CheckPassword.service";
import { GenerateJwtService } from "../../services/GenerateJwt.service";

class UsernamePatch {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try{
            const { _id: userId } = req.user;

            if (!userId)
                return HttpResponse.create(
                    HttpStatus.badRequest,
                    req,
                    res,
                    "User not found in request"
                );

            
            const { confirmationPassword } = req.body;
            const userReceived = req.body;
            const userOnDatabase = await UserRepository.findOneById(
                userId, 
                true
            );


            if (!userOnDatabase)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "User not found in database"
                )

            const passwordMatch = await CheckPasswordService.execute(
                confirmationPassword,
                userOnDatabase.password
            )


            if (!passwordMatch)
                return HttpResponse.create(
                    HttpStatus.unauthorized,
                    req,
                    res,
                    "Confirmation password dont match"
                );

                const { password, ...user } = await UserRepository.updateUsernameById(
                    userId, 
                    userReceived
                );
    
                const token = GenerateJwtService.execute(user);
    
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
    UsernamePatch
}