import { Router } from 'express';
import { ValidationSource } from '../../common/enums/ValidationSource.enum';
import { JwtValidator } from '../../common/validators/Auth/Jwt.joi';
import { GroupValidator } from '../../common/validators/Group/Group.joi';
import { GroupIdValidator } from '../../common/validators/Group/GroupId.joi';
import { CheckUserRole } from '../../core/handles/Member/CheckUserRole.handle';
import { GroupCreate } from '../../core/handles/Group/GroupCreate.handle';
import { GroupDemote } from '../../core/handles/Group/GroupDemote.handle';
import { GroupDuplicity } from '../../core/handles/Group/GroupDuplicity.handle';
import { GroupJoin } from '../../core/handles/Group/GroupJoin.handle';
import { GroupLeave } from '../../core/handles/Group/GroupLeave.handle';
import { GroupPromove } from '../../core/handles/Group/GroupPromove.handle';
import { GroupRemove } from '../../core/handles/Group/GroupRemove.handle';
import { JwtVerification } from '../../core/handles/Jwt/JwtVerification.handle';
import { UserTokenFind } from '../../core/handles/User/UserTokenFind.handle';
import { Validator } from '../../helpers/Validator';
import { CheckMemberRole } from '../../core/handles/Member/CheckMemberRole.handle';
import { MemberIdValidator } from '../../common/validators/Member/MemberId.joi';


class GroupsRoute {
    static create() {
        const router = Router();

        router.post(
            "",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                GroupValidator.schema
            ),
            JwtVerification.handle,
            GroupDuplicity.handle,
            UserTokenFind.handle,
            GroupCreate.handle
        );

        router.patch(
            "/:groupId/join",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            JwtVerification.handle,
            UserTokenFind.handle,
            GroupJoin.handle
        );


        router.delete(
            "/:groupId/leave",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            JwtVerification.handle,
            UserTokenFind.handle,
            GroupLeave.handle
        );

        router.delete(
            "/:groupId/remove/:memberId",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            Validator.validate(
                MemberIdValidator.schema,
                ValidationSource.PARAMS
            ),
            JwtVerification.handle,
            UserTokenFind.handle,
            CheckUserRole.handle,
            CheckMemberRole.handle,
            GroupRemove.handle
        );

        router.patch(
            "/:groupId/promote/:memberId",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            Validator.validate(
                MemberIdValidator.schema,
                ValidationSource.PARAMS
            ),
            JwtVerification.handle,
            UserTokenFind.handle,
            CheckUserRole.handle,
            CheckMemberRole.handle,
            GroupPromove.handle
        );

        router.patch(
            "/:groupId/demote/:memberId",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            Validator.validate(
                MemberIdValidator.schema,
                ValidationSource.PARAMS
            ),
            JwtVerification.handle,
            UserTokenFind.handle,
            CheckUserRole.handle,
            CheckMemberRole.handle,
            GroupDemote.handle
        );


        return router;
    }
}


export {
    GroupsRoute
}