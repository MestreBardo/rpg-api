import { NextFunction, Response } from "express";
import { HttpStatus } from "../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { UserUpdateValidator } from "../../common/validators/User/UserUpdate.joi";
import { GenerateJwtService } from "../../core/services/GenerateJwt.service";
import { HttpSendService } from "../../core/services/HttpSend.service";
import { UpdateUserService } from "../../core/services/user/UpdateUser.service";
import { Validator } from "../../helpers/Validator";

class UpdateUserController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const receivedUserUpdate = req.body;
            Validator.validate(UserUpdateValidator.schema, receivedUserUpdate);
            const updatedUser = await UpdateUserService.execute(user, receivedUserUpdate);
            const token =  GenerateJwtService.execute(updatedUser);
            HttpSendService.execute(req, res, HttpStatus.OK, token);
        } catch (error) {
            next(error);
        }
    }
}

export { UpdateUserController };