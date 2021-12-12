import { Router } from 'express';
import { CreateGroupController } from '../../controllers/group/CreateGroup.controller';
import { DemoteMemberController } from '../../controllers/group/DemoteMember.controller';
import { JoinGroupSignedUserController } from '../../controllers/group/JoinGroupSignedUser.controller';
import { LeaveGroupSignedUserController } from '../../controllers/group/LeaveGroupSignedUser.controller';
import { PromoteMemberController } from '../../controllers/group/PromoteMember.controller';
import { RemoveGroupUserController } from '../../controllers/group/RemoveGroupUser.controller';
import { RetrieveGroupController } from '../../controllers/group/RetrieveGroup.controller';
import { RetrieveGroupCampaignsController } from '../../controllers/group/RetrieveGroupCampaigns.controller';
import { RetrieveGroupMembersController } from '../../controllers/group/RetrieveGroupMembers.controller';
import { RetrieveGroupsController } from '../../controllers/group/RetrieveGroups.controller';
import { UpdateGroupController } from '../../controllers/group/UpdateGroup.controller';
import { UpdateGroupNameController } from '../../controllers/group/UpdateGroupName.controller';
import { JwtVerificationMiddleware } from '../../core/handles/Jwt/JwtVerification.middleware';
import { CreateGroupService } from '../../core/services/group/CreateGroup.service';


class GroupsRoute {
    static create() {
        const router = Router();

        //JWT check authorization
        router.use(
            JwtVerificationMiddleware.handle,
        )

        //Get a single group by id
        router.get(
            "/:id",
            RetrieveGroupController.handle
        );

        router.get(
            "/:id/campaigns",
            RetrieveGroupCampaignsController.handle
        );

        //Get a single group members
        router.get(
            "/:id/members",
            RetrieveGroupMembersController.handle
        );

        //Get groups
        router.get(
            "",
            RetrieveGroupsController.handle
        );

        //Create a single group
        router.post(
            "",
            CreateGroupController.handle
        );

        //Join group
        router.patch(
            "/:groupId/join",
            JoinGroupSignedUserController.handle
        );

        //Leave group
        router.delete(
            "/:groupId/leave",
            LeaveGroupSignedUserController.handle
        );

        router.delete(
            "/:id/member/:memberId",
            RemoveGroupUserController.handle
        );

        //Promote member group
        router.patch(
            "/:groupId/promote/:memberId",
            PromoteMemberController.handle
        );

        //Demote member group
        router.patch(
            "/:groupId/demote/:memberId",
            DemoteMemberController.handle
        );

        //Update group
        router.put(
            "/:id",
            UpdateGroupController.handle
        );

        //Update group name
        router.patch(
            "/:id/name",
            UpdateGroupNameController.handle
        )


        return router;
    }
}


export {
    GroupsRoute
}