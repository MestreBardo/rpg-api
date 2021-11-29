import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { MemberIdValidator } from '../../common/validators/Member/MemberId.joi';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { DemoteMemberService } from '../../core/services/member/DemoteMember.service';
import { PromoteMemberService } from '../../core/services/member/PromoteMember.service';
import { Validator } from '../../helpers/Validator';

class PromoteMemberController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const member = { id: req.params["memberId"] };
            Validator.validate(MemberIdValidator.schema, member);
            const promotedMember = await PromoteMemberService.execute(user, member);
            HttpSendService.execute(req, res, HttpStatus.OK, promotedMember);

        } catch (error) {
            next(error);
        }
    }
}

export { PromoteMemberController };