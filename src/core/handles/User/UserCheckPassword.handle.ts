import { NextFunction, Response } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../../common/extended_types/express/Request.extended";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { CheckPasswordService } from "../../services/user/CheckPassword.service";

class UserCheckPassword {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {

        try {
            const user = req.user;
            
            const { confirmationPassword } = req.body;

            if (!user || !confirmationPassword)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                ); 


            const passwordMatch = await CheckPasswordService.execute(
                confirmationPassword,
                user.password
            );

            if (!passwordMatch)
                return HttpResponse.create(
                    HttpStatus.unauthorized,
                    req,
                    res,
                    "Confirmation password dont match"
                )

            next();

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
    UserCheckPassword
}