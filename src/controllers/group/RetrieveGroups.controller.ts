import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { RetrieveGroupsService } from '../../core/services/group/RetrieveGroups.service';
import { HttpSendService } from '../../core/services/HttpSend.service';

class RetrieveGroupsController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const searchParams = req.query;
            const user = req.user;
            console.log(user);
            const groupFound = await RetrieveGroupsService.execute(searchParams, user["_id"].toString());
            HttpSendService.execute(req, res, HttpStatus.OK, groupFound);

        } catch (error) {
            next(error);
        }
    }
}

export { RetrieveGroupsController };