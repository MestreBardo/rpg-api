import { Router } from 'express';
import { ValidationSource } from '../../common/enums/ValidationSource.enum';
import { JwtValidator } from '../../common/validators/Auth/Jwt.joi';
import { GroupCreateValidator } from '../../common/validators/Group/GroupCreate.joi';
import { GroupIdValidator } from '../../common/validators/Group/GroupId.joi';
import { MemberAdminRole } from '../../core/handles/Member/MemberAdminRole';
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
import { MemberUpdateRole } from '../../core/handles/Member/MemberUpdateRole.handle';
import { MemberIdValidator } from '../../common/validators/Member/MemberId.joi';
import { GroupUpdateValidator } from '../../common/validators/Group/GroupUpdate.joi';
import { GroupUpdate } from '../../core/handles/Group/GroupUpdate.handle';
import { GroupUpdateName } from '../../core/handles/Group/GroupUpdateName.handle';
import { GroupUpdateNameValidator } from '../../common/validators/Group/GroupUpdateName.joi';
import { GroupFindOne } from '../../core/handles/Group/GroupFindOne.handle';
import { GroupFindMany } from '../../core/handles/Group/GroupFindMany.handle';
import { GroupMembers } from '../../core/handles/Group/GroupMembers.handle';
import { GroupFind } from '../../core/handles/Group/GroupFind.handle';
import { MemberDuplicityGroup } from '../../core/handles/Member/MemberDuplicityGroup.handle';
import { MemberFind } from '../../core/handles/Member/MemberFind.handle';


class GroupsRoute {
    static create() {
        const router = Router();

        //JWT check authorization
        router.use(
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            JwtVerification.handle,
        )

        //Get a single group by id
        router.get(
            "/:groupId",
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            GroupFindOne.handle
        );

        //Get a single group members
        router.get(
            "/:groupId/members",
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            GroupFind.handle(
                ValidationSource.PARAMS
            ),
            GroupMembers.handle
        );

        //Get groups
        router.get(
            "",
            GroupFindMany.handle
        );

        //Create a single group
        router.post(
            "",
            Validator.validate(
                GroupCreateValidator.schema
            ),
            UserTokenFind.handle,
            GroupDuplicity.handle,
            GroupCreate.handle
        );

        //Join group
        router.patch(
            "/:groupId/join",
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            UserTokenFind.handle,
            GroupFind.handle(
                ValidationSource.PARAMS
            ),
            MemberDuplicityGroup.handle,
            GroupJoin.handle
        );

        //Leave group
        router.delete(
            "/:groupId/leave",
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            UserTokenFind.handle,
            GroupFind.handle(
                ValidationSource.PARAMS
            ),
            MemberFind.handle,
            GroupLeave.handle
        );

        //Remove member group
        router.delete(
            "/:groupId/remove/:memberId",
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            Validator.validate(
                MemberIdValidator.schema,
                ValidationSource.PARAMS
            ),
            UserTokenFind.handle,
            GroupFind.handle(
                ValidationSource.PARAMS
            ),
            MemberFind.handle,
            MemberAdminRole.handle,
            MemberUpdateRole.handle,
            GroupRemove.handle
        );

        //Promote member group
        router.patch(
            "/:groupId/promote/:memberId",
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            Validator.validate(
                MemberIdValidator.schema,
                ValidationSource.PARAMS
            ),
            UserTokenFind.handle,
            GroupFind.handle(
                ValidationSource.PARAMS
            ),
            MemberFind.handle,
            MemberAdminRole.handle,
            MemberUpdateRole.handle,
            GroupPromove.handle
        );

        //Demote member group
        router.patch(
            "/:groupId/demote/:memberId",
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            Validator.validate(
                MemberIdValidator.schema,
                ValidationSource.PARAMS
            ),
            UserTokenFind.handle,
            GroupFind.handle(
                ValidationSource.PARAMS
            ),
            MemberFind.handle,
            MemberAdminRole.handle,
            MemberUpdateRole.handle,
            GroupDemote.handle
        );

        //Update group
        router.put(
            "/:groupId",
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            Validator.validate(
                GroupUpdateValidator.schema
            ),
            UserTokenFind.handle,
            GroupFind.handle(
                ValidationSource.PARAMS
            ),
            MemberFind.handle,
            MemberAdminRole.handle,
            GroupUpdate.handle
        );

        //Update group name
        router.patch(
            "/:groupId/name",
            Validator.validate(
                GroupUpdateNameValidator.schema
            ),
            Validator.validate(
                GroupIdValidator.schema,
                ValidationSource.PARAMS
            ),
            UserTokenFind.handle,
            GroupFind.handle(
                ValidationSource.PARAMS
            ),
            GroupDuplicity.handle,
            MemberFind.handle,
            MemberAdminRole.handle,
            GroupUpdateName.handle
        )


        return router;
    }
}


export {
    GroupsRoute
}