import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { UserUpdateUsernameValidator } from '../../common/validators/User/UserUpdateUsename.joi';
import { GenerateJwtService } from '../../core/services/GenerateJwt.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { UpdateUserUsernameService } from '../../core/services/user/UpdateUserUsername.service';
import { Validator } from '../../helpers/Validator';

class UpdateUserUsernameController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const receivedUserUpdate = req.body;
            Validator.validate(UserUpdateUsernameValidator.schema, receivedUserUpdate);
            const updatedUser = await UpdateUserUsernameService.execute(user, receivedUserUpdate);
            const token = GenerateJwtService.execute(updatedUser);
            HttpSendService.execute(req, res, HttpStatus.OK, token);
        } catch (error) {
            next(error);
        }
    }
}

export { UpdateUserUsernameController };