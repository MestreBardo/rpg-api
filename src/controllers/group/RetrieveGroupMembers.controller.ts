import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { RetrieveGroupMembersService } from '../../core/services/group/RetrieveGroupsMembers.service';
import { HttpSendService } from '../../core/services/HttpSend.service';

class RetrieveGroupMembersController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const group = { id: req.params["id"] }
            const searchParams =  req.query;
            const groupFound = await RetrieveGroupMembersService.execute(group["id"], searchParams);
            HttpSendService.execute(req, res, HttpStatus.OK, groupFound);

        } catch (error) {
            next(error);
        }
    }
}

export { RetrieveGroupMembersController };