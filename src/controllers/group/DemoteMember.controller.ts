import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { MemberIdValidator } from '../../common/validators/Member/MemberId.joi';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { DemoteMemberService } from '../../core/services/member/DemoteMember.service';
import { Validator } from '../../helpers/Validator';

class DemoteMemberController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const member = { id: req.params.id };
            Validator.validate(MemberIdValidator.schema, member);
            const demotedMember = await DemoteMemberService.execute(user, member);
            HttpSendService.execute(req, res, HttpStatus.OK, demotedMember);

        } catch (error) {
            next(error);
        }
    }
}

export { DemoteMemberController };