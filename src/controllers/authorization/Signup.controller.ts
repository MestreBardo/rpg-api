import { Response, Request, NextFunction } from "express";
import { Validator } from "../../helpers/Validator";
import { UserCreateValidator } from "../../common/validators/User/UserCreate.joi";
import { GenerateJwtService } from "../../core/services/GenerateJwt.service";
import { HttpStatus } from "../../common/constants/HttpStatus.enum";
import { HttpSendService } from "../../core/services/HttpSend.service";
import { CreateUserService } from "../../core/services/user/CreateUser.service";


class SignupController {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const receivedUser = req.body;
            Validator.validate(UserCreateValidator.schema, receivedUser);
            const newUser = await CreateUserService.execute(receivedUser);
            const token = GenerateJwtService.execute(newUser);
            HttpSendService.execute(req, res, HttpStatus.CREATED, token);
            
        } catch (error) {
            next(error);
        }
        
    }
}

export { SignupController };