import { NextFunction, Response } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { UpdateGroupService } from '../../core/services/group/UpdateGroup.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
class UpdateGroupController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const user = req.user;
            const group = { id: req.params["id"] };
            const groupUpdate = req.body;
            const updatedGroup = await UpdateGroupService.execute(user["_id"], group["id"], groupUpdate);
            HttpSendService.execute(req, res, HttpStatus.OK, updatedGroup);
        } catch (error) {
            next(error);
        }
    }
}
 
export { UpdateGroupController };