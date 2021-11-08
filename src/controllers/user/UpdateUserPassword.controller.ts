import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { UserUpdatePasswordValidator } from '../../common/validators/User/UserUpdatePassword.joi';
import { GenerateJwtService } from '../../core/services/GenerateJwt.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { UpdateUserPasswordService } from '../../core/services/user/UpdateUserPassword.service';
import { Validator } from '../../helpers/Validator';

class UpdateUserPasswordController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        const user = req.user;
        const receivedUserUpdate = req.body;
        Validator.validate(UserUpdatePasswordValidator.schema, receivedUserUpdate);
        const updatedUser = await UpdateUserPasswordService.execute(user, receivedUserUpdate);
        const token = GenerateJwtService.execute(updatedUser);
        HttpSendService.execute(req, res, HttpStatus.OK, token);
    }
}

export { UpdateUserPasswordController };