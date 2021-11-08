import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { GroupIdValidator } from '../../common/validators/Group/GroupId.joi';
import { JoinGroupService } from '../../core/services/group/JoinGroup.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { Validator } from '../../helpers/Validator';

class JoinGroupSignedUserController {
    static async execute(req: RequestWithUser, res: Response, next: NextFunction){
        try {
            const user = req.user;
            const group = {id: req.params["groupId"]};
            Validator.validate(GroupIdValidator.schema, group);
            const groupJoined = await JoinGroupService.execute(user, group);
            HttpSendService.execute(req, res, HttpStatus.OK, groupJoined);
            
        } catch (error) {
            next(error);
        }
    }
}

export { JoinGroupSignedUserController };