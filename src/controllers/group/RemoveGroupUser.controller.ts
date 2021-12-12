import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { MemberIdValidator } from '../../common/validators/Member/MemberId.joi';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { DemoteMemberService } from '../../core/services/member/DemoteMember.service';
import { PromoteMemberService } from '../../core/services/member/PromoteMember.service';
import { RemoveMemberService } from '../../core/services/member/RemoveMember.service';
import { Validator } from '../../helpers/Validator';

class RemoveGroupUserController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const group = req.params["id"];
            const member = req.params["memberId"];
            await RemoveMemberService.execute(user, member, group);
            HttpSendService.execute(req, res, HttpStatus.OK, {});

        } catch (error) {
            next(error);
        }
    }
}

export { RemoveGroupUserController };