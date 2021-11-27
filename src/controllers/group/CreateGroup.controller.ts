import { Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { GroupCreateValidator } from '../../common/validators/Group/GroupCreate.joi';
import { CreateGroupService } from '../../core/services/group/CreateGroup.service';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { Validator } from '../../helpers/Validator';

class CreateGroupController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const receivedGroup = req.body;
            console.log(req.body);
           
            Validator.validate(GroupCreateValidator.schema, receivedGroup);
            const createdGroup = await CreateGroupService.execute(user, receivedGroup);
            HttpSendService.execute(req, res, HttpStatus.CREATED, createdGroup)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export { CreateGroupController };