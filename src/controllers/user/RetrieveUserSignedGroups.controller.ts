import { NextFunction, Response } from "express";
import { HttpStatus } from "../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { HttpSendService } from "../../core/services/HttpSend.service";
import { RetrieveUserGroupsService } from "../../core/services/user/RetrieveUserGroups.service";

class RetrieveUserSignedGroupsController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const groups = await RetrieveUserGroupsService.execute(user["_id"]);
            HttpSendService.execute(req, res, HttpStatus.OK, groups) 
        } catch (error) {
            next(error);
        }
    }
}

export { RetrieveUserSignedGroupsController };