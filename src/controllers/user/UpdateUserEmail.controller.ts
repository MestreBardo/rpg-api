import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { UserUpdateEmailValidator } from '../../common/validators/User/UserUpdateEmail.joi';
import { GenerateJwtService } from '../../core/services/GenerateJwt.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { UpdateUserEmailService } from '../../core/services/user/UpdateUserEmail.service';
import { Validator } from '../../helpers/Validator';
class UpdateUserEmailController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const receivedUserUpdate = req.body;
            Validator.validate(UserUpdateEmailValidator.schema, receivedUserUpdate);
            const updatedUser = await UpdateUserEmailService.execute(user, receivedUserUpdate);
            const token = GenerateJwtService.execute(updatedUser);
            HttpSendService.execute(req, res, HttpStatus.OK, token);
        } catch (error) {
            next(error);
        }
    }
}

export { UpdateUserEmailController };