import { NextFunction, Response, Request } from "express";
import { HttpStatus } from "../../../common/constants/HttpStatus.enum";
import { HttpResponse } from "../../../common/responses/HttpResponse.factory";
import { UserRepository } from "../../../database/repositories/User.repository";
import { CheckPasswordService } from "../../services/user/CheckPassword.service";
import { GenerateJwtService } from "../../services/GenerateJwt.service";

class AuthorizationSignIn {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, password: loginPassword } = req.body;

            if (!login || !loginPassword)
                return HttpResponse.create(
                    HttpStatus.internalServerError,
                    req,
                    res,
                    "Server have a error to process the request!"
                );

            const user = await UserRepository.findByUsernameOrEmail(
                login,
                login,
            );
    
            if(!user)
                return HttpResponse.create(
                    HttpStatus.notFound,
                    req,
                    res,
                    "User not found"
                )
            
            const passwordMatch = await CheckPasswordService.execute(
                loginPassword,
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
                token
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
    AuthorizationSignIn
}