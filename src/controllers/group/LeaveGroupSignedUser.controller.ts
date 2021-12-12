import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { GroupIdValidator } from '../../common/validators/Group/GroupId.joi';
import { LeaveGroupService } from '../../core/services/group/LeaveGroup.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { Validator } from '../../helpers/Validator';

class LeaveGroupSignedUserController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction){
        try {
            const user = req.user;
            console.log(user);
            const group = {id: req.params["groupId"]};
            Validator.validate(GroupIdValidator.schema, group);
            const groupLeaved = await LeaveGroupService.execute(user, group);
            HttpSendService.execute(req, res, HttpStatus.OK, groupLeaved);
            
        } catch (error) {
            next(error);
        }
    }
}

export { LeaveGroupSignedUserController };