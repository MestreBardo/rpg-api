import { Response } from 'express';
import { NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { RetrieveUsersToAddService } from '../../core/services/campaign/RetrieveUsersToAdd.service';
import { HttpSendService } from '../../core/services/HttpSend.service';

class RetrieveUsersToAddController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const user = req.user;
            const campaign = { id: req.params["id"] }
            const textToSearch = req.query["username"];
            const users = await RetrieveUsersToAddService.execute(user["_id"], campaign["id"], textToSearch as string);
            HttpSendService.execute(req, res, HttpStatus.OK, users);

        } catch (error) {
            next(error);
        }
    }
}

export { RetrieveUsersToAddController };