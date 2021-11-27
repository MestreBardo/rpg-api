import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { LoginValidator } from '../../common/validators/Auth/Login.joi';
import { GenerateJwtService } from '../../core/services/GenerateJwt.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { VerifyUserService } from '../../core/services/user/VerifyUser.service';
import { Validator } from '../../helpers/Validator';

class SigninController {
    static async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const receivedLogin = req.body;
            console.log(receivedLogin);
            Validator.validate(LoginValidator.schema, receivedLogin);
            const user = await VerifyUserService.execute(receivedLogin, receivedLogin.password);
            const token = GenerateJwtService.execute(user);
            HttpSendService.execute(req, res, HttpStatus.OK, token);
        } catch (error) {
            next(error);
        }
    }
}

export { SigninController };