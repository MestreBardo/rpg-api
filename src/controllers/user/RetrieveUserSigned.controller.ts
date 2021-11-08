import { NextFunction, Response } from "express";
import { HttpStatus } from "../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { HttpSendService } from "../../core/services/HttpSend.service";
import { RetrieveUserService } from "../../core/services/user/RetrieveUserService.service";

class RetrieveUserSignedController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const {password, ...findedUser} = await RetrieveUserService.execute(user["id"]);
            HttpSendService.execute(req, res, HttpStatus.OK, findedUser) 
        } catch (error) {
            next(error);
        }
    }
}

export { RetrieveUserSignedController };