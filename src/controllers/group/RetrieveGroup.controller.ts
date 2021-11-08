import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { RetrieveGroupService } from '../../core/services/group/RetrieveGroup.service';
import { HttpSendService } from '../../core/services/HttpSend.service';

class RetrieveGroupController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const user = req.user;
            const group = { id: req.params["id"] }
            const groupFound = await RetrieveGroupService.execute(user, group["id"]);
            HttpSendService.execute(req, res, HttpStatus.OK, groupFound);

        } catch (error) {
            next(error);
        }
    }
}

export { RetrieveGroupController };