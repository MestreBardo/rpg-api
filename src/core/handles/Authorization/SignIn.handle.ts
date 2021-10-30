import { NextFunction, Response, Request } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";
import { CheckPasswordService } from "../../services/CheckPassword.service";
import { GenerateJwtService } from "../../services/GenerateJwt.service";

class SignIn {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserRepository.findByUsernameOrEmail(
                req.body.login,
                req.body.login,
                true
            );
    
            if(!user)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "User not found"
                )
            
            const passwordMatch = await CheckPasswordService.execute(
                req.body.password,
                user.password
            )
    
            if (!passwordMatch)
                return HttpResponse.create(
                    HttpStatus.unauthorized,
                    req,
                    res,
                    "Password don't match"
                )
    
            const { password, ...userToToken } = user;
    
            const token = GenerateJwtService.execute(userToToken);
    
            return HttpResponse.create(
                HttpStatus.ok,
                req,
                res,
                {token}
            )
            
        } catch (error: any) {
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
    SignIn
}